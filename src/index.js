/**
 * commons-reg
 * 
 * git token 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
*/
const regObj = {
    name:/^([\u4e00-\u9fa5]|\w){0,7}/img,
    phone : /^1[34578]\d{9}$/,
    required:/^\s*$/,
    provincialCard:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
    organizationCode:/^[^\u4e00-\u9fa5]{0,30}$/, //机构代码
    length:/^[\s\S]{length}$/,
    maxLength:/^[\s\S]{maxLength}$/,
    minLength:/^[\s\S]{minLength}/,
    rangelength:/^[\s\S]{rangelength}$/,
    verifyCode:/^\d{6}/,
    passport:/^[0-9A-Z]{9}$/,
    email:/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
    noBlankSpace:/\s+/,
    specialSymbols: /[`~!@#$%^&*()_+<>?:"{},，。.\/;'[\]]+/,
    amount:/^\d{1,6}(\.\d{0,2})?$/
};
const validata = {}
const regExt = new Map()
const check = (key,str,option = {farmt:undefined}) => {
    const mapReg  = regExt.get(key) || undefined;
    const reg = regObj[key];
    if (mapReg) {
        return mapReg(str);
    }
    return str ? option.farmt? option.farmt(str) :new RegExp(reg).test(str): false;
};
const task = (key)=> {
    validata[key] = (str,option = {}) => check(key,str,option);
}
export const insertRule = (option = {name:'',reg:''}) => {
   const  {name,reg,farmt = undefined} = option;
   if(name && ( reg || farmt )){
       if(reg && !regObj[name]){
          regObj[name] = reg;
       }else{
          new Error(`this ${name} in regObj`);
       }
       if(reg && farmt){
         regExt.set(name,farmt)
       }
       // 进入任务dispath
       task(name);
   }else{
       new Error('params is not a undefind')
   }
}
const init = () => Object.keys(regObj).map(item => task(item));
if(!validata.name){
    init();
}
export default validata;