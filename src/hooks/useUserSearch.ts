import { ref, watch, shallowReactive } from "vue";
import GitHubAPIService from "../services/GitHubAPIService"
import User from "../models/User"
import { AxiosResponse } from "axios";


export default function useUserSearch() {
    const searchField = ref('')

    const searchInProcess = ref(false)

    const userSuggestionList = shallowReactive<User[]>([]);

    const MAX_SUGGESTION_LENGTH = 8 

    watch(searchField, () => {
        searchInProcess.value = true
        if (searchField.value === '') {
            userSuggestionList.length = 0
            searchInProcess.value = false
        }
    })

    const searchInGithub = () => {
        GitHubAPIService.getUserByName(searchField.value).then((res: AxiosResponse<User>) => {
            if (res.data.id && listAvailable()) {
                userSuggestionList.push(res.data)
            }

            function listAvailable(): boolean {
                return userSuggestionList.length < MAX_SUGGESTION_LENGTH
                 && !userSuggestionList.find(user => user.id === res.data.id)
            }

        }).finally(() => {
            searchInProcess.value = false
        })
    }


    return {
        searchField,
        searchInGithub,
        userSuggestionList,
        searchInProcess
    }
}