import { getAllActiveOrganization } from '@/repository/organization.repository';

async function getOrganization () {
  const data = await getAllActiveOrganization();
  return data || [];
}

export {
  getOrganization
};
