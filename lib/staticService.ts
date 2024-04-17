import { getAbsoluteUrl } from "./apiHelpers";

getAbsoluteUrl

export async function getStaticGroups() {
    const response = await fetch(`${getAbsoluteUrl()}/api/static`, {cache: 'no-store'});
    return response.json();
}

export async function getStaticGroup(staticId: string) {
    const repsonse = await fetch(`${getAbsoluteUrl()}/api/static/${staticId}`, {cache: 'no-store'})
    return repsonse.json()
}