const POPUP_EXCEPTION_CODE = '10001';

const POLITICALOPTIONS = [
  {value: '中共党员', label: '中共党员'}, {value: '中共预备党员', label: '中共预备党员'}, {value: '共青团员', label: '共青团员'},
  {value: '群众', label: '群众'}, {value: '民革党员', label: '民革党员'}, {value: '民盟盟员', label: '民盟盟员'},
  {value: '民进会员', label: '民进会员'}, {value: '农工党党员', label: '农工党党员'}, {value: '致公党党员', label: '致公党党员'},
  {value: '九三学社社员', label: '九三学社社员'}, {value: '台盟盟员', label: '台盟盟员'}, {value: '无党派人士', label: '无党派人士'}
  ];

const NATIONOPTIONS = [
  {name: '汉族'}, {name: '壮族'}, {name: '藏族'}, {name: '裕固族'}, {name: '彝族'}, {name: '瑶族'}, {name: '锡伯族'}, {name: '乌孜别克族'}, {name: '维吾尔族'}, {name: '佤族'}, {name: '土家族'}, {name: '土族'}, {name: '塔塔尔族'}, {name: '塔吉克族'},
  {name: '水族'}, {name: '畲族'}, {name: '撒拉族'}, {name: '羌族'}, {name: '普米族'}, {name: '怒族'}, {name: '纳西族'}, {name: '仫佬族'}, {name: '苗族'}, {name: '蒙古族'}, {name: '门巴族'}, {name: '毛南族'}, {name: '满族'}, {name: '珞巴族'}, {name: '僳僳族'},
  {name: '黎族'}, {name: '拉祜族'}, {name: '柯尔克孜族'}, {name: '景颇族'}, {name: '哈萨克族'}, {name: '仡佬族'}, {name: '高山族'}, {name: '俄罗斯族'}, {name: '东乡族'}, {name: '侗族'}, {name: '傣族'}, {name: '朝鲜族'}, {name: '布朗族'}, {name: '白族'},
  {name: '京族'}, {name: '基诺族'}, {name: '回族'}, {name: '赫哲族'}, {name: '哈尼族'}, {name: '鄂温克族'}, {name: '鄂伦春族'}, {name: '独龙族'}, {name: '德昂族'}, {name: '达斡尔族'}, {name: '布依族'}, {name: '保安族'}, {name: '阿昌族'}
  ];

const STUDENT_UPLOAD_URL = `/xuexin/security/admin/student/upload`;
const TEACHER_UPLOAD_URL = `/xuexin/security/admin/teacher/upload`;
const COURSE_UPLOAD_URL = `/xuexin/security/admin/course/upload`;
const PHOTO_UPLOAD_URL = `/xuexin/security/student/resume/upload`;

export default {
  POPUP_EXCEPTION_CODE,
  POLITICALOPTIONS,
  NATIONOPTIONS,
  STUDENT_UPLOAD_URL,
  TEACHER_UPLOAD_URL,
  COURSE_UPLOAD_URL,
  PHOTO_UPLOAD_URL
}
