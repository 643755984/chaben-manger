import { ref, computed  } from 'vue'

export default function useNav() {
    const url = ref('http://127.0.0.1:7001')

    const setImgUrl = (str) => {
        return url.value + str
    }

    return {
        setImgUrl
    }
}