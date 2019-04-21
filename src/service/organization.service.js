import { getAllActiveOrganization, getActiveOrganizationByPage, getOrganizationByConditions, saveOrganization, removeOrganizationList } from '@/repository/organization.repository';

async function getOrganization () {
  const data = await getAllActiveOrganization();
  return data || [];
}

async function getOrganizationInfoPage (param) {
  const data = await getActiveOrganizationByPage(param);
  return data || [];
}

async function findOrganizationByConditions (param) {
  const data = await getOrganizationByConditions(param);
  return data || [];
}

async function saveOrganizationInfo (param) {
  const data = await saveOrganization(param);
  return data || [];
}

async function removeOrganizations (param) {
  const data = await removeOrganizationList(param);
  return data || [];
}

export {
  getOrganization,
  getOrganizationInfoPage,
  findOrganizationByConditions,
  saveOrganizationInfo,
  removeOrganizations
};
