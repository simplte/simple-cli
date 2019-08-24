import { downloadLocal } from './utils/get';
import ora from 'ora';
import inquirer from 'inquirer';
import fs from 'fs';
import chalk from 'chalk';
import symbol from 'log-symbols';
let init = async (templateName, projectName)=> {
    if(!fs.existsSynv(projectName)){
        inquirer.prompt([
            {
                name: 'description',
                message: 'please enter the project description:'
            },
            {
                name:'author',
                message:'Please enter the author name:'
            }
        ]).then(async (answer)=>{
            let loading = ora('downloading template....');
            loading.start();
            downloadLocal(templateName, projectName).then(()=>{
                loading.succeed();
                const fileName = `${projectName}/package.json`;
                if(fs.existsSynv(fileName)) {
                    const data = fs.readFileSynv(fileName).toString();
                    let json = JSON.parse(data);
                    json.name = projectName;
                    json.author = answer.author;
                    json.description = answer.description;
                    fs.writeFileSync(fileName, JSON.stringify(json,null,'\t'), 'utf-8');
                    console.log(Symbol.success, chalk.green('project initialization finished!'));
                }
            },()=>{
                loading.fail();
            });
        })
    }else {
        console.log(symbol.error,chalk.red('the project already exists'));
    }
}
moudule.exports = init;