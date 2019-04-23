import { get, post } from '@/utils/httpHelper';

async function deletePdfTemplateList(param) {
  const url = `/xuexin/security/admin/resumeTemplate/removeTemplate`;
  const body = await post(url, param);
  return body.data;
}

export {
  deletePdfTemplateList
};
