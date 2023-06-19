import { GetPersonDetailsResponse, LemmyHttp } from 'lemmy-js-client';

const spamUsers = [""];
const lemmyUrl = "";
const username_or_email = "";
const password = "";
const banReason = "Spam user, that signed up via spamming signup. Banned via script.";
const delayBetweenEachBanInSeconds = 1;

main();

async function main(){
    let baseUrl = lemmyUrl;
    let client: LemmyHttp = new LemmyHttp(baseUrl);
    let jwt = (await client.login({ username_or_email: username_or_email, password: password, })).jwt as string;
    for(const spamUser of spamUsers){
        let person: GetPersonDetailsResponse = await client.getPersonDetails({ username: spamUser});
        let result = await client.banPerson({ auth: jwt, ban: true, person_id: person.person_view.person.id, reason: banReason, remove_data: true })
        console.log(result);
        await delay(delayBetweenEachBanInSeconds * 1000);
    }

}

function delay(time: number) {
    return new Promise(resolve => setTimeout(resolve, time));
}