import redis from "../utils/redis";

interface saveRestoredProps {
  uuid: string,
  image: string,
  restored: string,
}
 
export const saveRestored = async (props: saveRestoredProps) => {
    try {
      let data = await redis?.set(`openio.ph${props.uuid}`, JSON.stringify(props));
    } catch (e) {
        console.error("Error adding document: ", e);
    }
  };

  
export const getRestored = async (slug: string) => {
    let data = null
    try {
        data = await redis?.get(`openio.ph${slug}`)
    } catch (e) {
        console.error("Error getting document: ", e);
    }  
    return data ? JSON.parse(data) : null;
  };
  