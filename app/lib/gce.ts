import { InstancesClient } from '@google-cloud/compute';

const DEFAULT_ZONE = 'us-central1-a';
const DEFAULT_MACHINE_TYPE = 'e2-micro';
const DEFAULT_IMAGE = 'projects/debian-cloud/global/images/family/debian-12';
const DEFAULT_NETWORK = 'global/networks/default';

const instancesClient = new InstancesClient();

export function getGcpProjectId() {
  const projectId = process.env.GCP_PROJECT_ID;
  if (!projectId) {
    throw new Error('Missing GCP_PROJECT_ID environment variable.');
  }
  return projectId;
}

export function getGceDefaults() {
  return {
    zone: process.env.GCP_ZONE ?? DEFAULT_ZONE,
    machineType: process.env.GCP_MACHINE_TYPE ?? DEFAULT_MACHINE_TYPE,
    image: process.env.GCP_IMAGE ?? DEFAULT_IMAGE,
  };
}

export async function createInstance(params: {
  name: string;
  projectId: string;
  zone: string;
  machineType: string;
  image: string;
}) {
  const { name, projectId, zone, machineType, image } = params;

  await instancesClient.insert({
    project: projectId,
    zone,
    instanceResource: {
      name,
      machineType: `zones/${zone}/machineTypes/${machineType}`,
      disks: [
        {
          boot: true,
          autoDelete: true,
          initializeParams: {
            sourceImage: image,
            diskSizeGb: '10',
          },
        },
      ],
      networkInterfaces: [
        {
          network: DEFAULT_NETWORK,
          accessConfigs: [
            {
              name: 'External NAT',
              type: 'ONE_TO_ONE_NAT',
            },
          ],
        },
      ],
    },
  });
}

export async function fetchInstanceStatus(params: {
  projectId: string;
  zone: string;
  vmId: string;
}) {
  const { projectId, zone, vmId } = params;

  try {
    const [instance] = await instancesClient.get({
      project: projectId,
      zone,
      instance: vmId,
    });

    return {
      status: instance?.status ?? 'UNKNOWN',
      notFound: false,
    };
  } catch (error) {
    const maybeError = error as { code?: number };
    if (maybeError.code === 404) {
      return { status: 'NOT_FOUND', notFound: true };
    }
    throw error;
  }
}
