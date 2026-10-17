import fs from 'node:fs';
const {default:validator}=await import(process.env.GLTF_VALIDATOR_PATH??'gltf-validator');
const results=[];
for(const path of fs.readdirSync('public/models',{recursive:true}).filter(n=>n.endsWith('.glb'))){const result=await validator.validateBytes(new Uint8Array(fs.readFileSync('public/models/'+path)),{uri:path});results.push({path,errors:result.issues.numErrors,warnings:result.issues.numWarnings});}
fs.writeFileSync('qa/critical-asset-validation.json',JSON.stringify(results,null,2));
if(results.some(r=>r.errors||r.warnings))throw Error(JSON.stringify(results.filter(r=>r.errors||r.warnings)));
console.log('PASS',results.length,'GLBs; zero Khronos errors or warnings');
