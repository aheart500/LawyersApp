export const removeTimeStamp = (obj: any)=>{
  const newObj = {...obj}
  delete newObj.createdAt
  delete newObj.updatedAt
  return newObj
}