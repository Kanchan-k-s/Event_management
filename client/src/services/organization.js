import api from "./api";


export default{
    addOrganizer(body){
        api.post('/organizer/add', body)
    }
}