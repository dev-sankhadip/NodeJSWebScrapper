import puppeter from 'puppeteer'
import cheerio from 'cheerio'
import { urls, chalkPadUrls } from './scrapperUrls'
import request from 'request'



const getStudentName= async (currentWebPage)=>{
    return currentWebPage.content()
    .then((html)=>{
        const $=cheerio.load(html);
        const studentName=$("#dd-user-menu").text();
        return studentName;
    })
}


const getStudentTestDetails=async (currentWebPage)=>{
    return currentWebPage.content()
    .then((html)=>{
        const $=cheerio.load(html);
        $('#tblCCLst')
        .find('tbody')
        .children('tr')
        .each((i, el)=>{
            $(el)
            .children('td')
            .each((i, el1)=>{
                if(i==0){
                    const questionTitle=$(el1).children('a').text();
                    console.log(questionTitle);
                }
            })
        })
    })
}


const signIntoWebsite=async (email, password)=>{
    const browser=await puppeter.launch({})
    const pages=await Promise.all([browser.newPage()]);
    const loginPage=await pages[0];
    return loginPage.goto(urls.startURL)
    .then(async ()=>{
        await loginPage.type("#email", email,{ delay:100 });
        await loginPage.type("#password", password,{ delay:100 });
        await loginPage.click("#btnSubmit");

        if(loginPage.url()===urls.successURL){
            await loginPage.goto(urls.attemptedQuestionURL)
            const studentNameDetails=await getStudentName(loginPage);
            const studentAttemptedTestDetails=await getStudentTestDetails(loginPage);
            console.log(studentNameDetails.trim());
        }
    })
}


export{
    signIntoWebsite
}