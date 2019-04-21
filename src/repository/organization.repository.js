import { get, post } from '@/utils/httpHelper';

async function getAllActiveOrganization () {
  const url = `/xuexin/security/admin/organization/findAllActive`;
  const body = await get(url);
  return body.data;
}

async function getActiveOrganizationByPage(param) {
  const url = `/xuexin/security/admin/organization/findActivePage/${param.currentPage}/${param.pageSize}`;
  const body = await get(url);
  return body.data;
}

async function getOrganizationByConditions(param) {
  const url = `/xuexin/security/admin/organization/findByConditions`;
  const body = await post(url, param);
  return body.data;
}

async function saveOrganization(param) {
  const url = `/xuexin/security/admin/organization/save`;
  const body = await post(url, param);
  return body.data;
}

async function removeOrganizationList(param) {
  const url = `/xuexin/security/admin/organization/remove`;
  const body = await post(url, param);
  return body.data;
}

export {
  getAllActiveOrganization,
  getActiveOrganizationByPage,
  getOrganizationByConditions,
  saveOrganization,
  removeOrganizationList
};
