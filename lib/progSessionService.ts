import { getAbsoluteUrl } from "./apiHelpers";

export async function getProgSessions(staticId: string) {
  const response = await fetch(`${getAbsoluteUrl()}/api/static/${staticId}/progsession`, {cache: 'no-store'});
  return response.json();
}

export async function getProgSession(staticId: string, progSessionId: string) {
  const repsonse = await fetch(`${getAbsoluteUrl()}/api/static/${staticId}/progsession/${progSessionId}`, {cache: 'no-store'})
  return repsonse.json()
}

export async function getWipeFormProperties() {
  const repsonse = await fetch(`${getAbsoluteUrl()}/api/wipe-form-properties`)
  return repsonse.json()
}