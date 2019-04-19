import { get, post } from '@/utils/httpHelper';

async function getAllActiveOrganization () {
  const url = `/xuexin/security/admin/organization/findAllActive`;
  const body = await get(url);
  return body.data;
}

export {
  getAllActiveOrganization
};
