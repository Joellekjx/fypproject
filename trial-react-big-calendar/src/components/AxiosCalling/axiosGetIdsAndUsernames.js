import axios from 'axios';

export default function axiosGetIdsAndUsernames(calendarStore) {
    const { setListOfAllIdsAndUsernames } = calendarStore;
    const BASEURL = 'http://127.0.0.1:8000'
    axios.get(`${BASEURL}/api/usersAndProjects/`)
        .then(res => {
            res.data.map((item) => {
                setListOfAllIdsAndUsernames({ id: item.id, username: item.username })
            })
        }).catch(err => {
            console.log(err)
        })
}