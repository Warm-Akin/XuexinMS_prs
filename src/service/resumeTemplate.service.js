import { deletePdfTemplateList } from '@/repository/resumeTemplate.repository';

async function deletePdfTemplates (params) {
  const data = await deletePdfTemplateList(params);
  return data || [];
}

export {
  deletePdfTemplates
};
