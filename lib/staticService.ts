

// export async function createStatic(progData:any) {
//   try {
//     const response = await axios.post('/api/prog', progData);
//     return response.data;
//   } catch (error) {
//     console.error('Error creating prog session:', error);
//     throw error;
//   }
// }

export async function getStaticGroups() {
    const response = await fetch(`${process.env.ENV}/api/static`, {cache: 'no-store'});
    return response.json();
}

export async function getStaticGroup(staticId: string) {
    const repsonse = await fetch(`${process.env.ENV}/api/static/${staticId}`, {cache: 'no-store'})
    return repsonse.json()
}