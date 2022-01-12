import { ref, onMounted } from "vue";
import { getGradeList } from '@/api/school'
import { useRoute } from 'vue-router'

export default function useNav() {
    const route = useRoute ()
    const { schoolId, majorId } = route.query
    let gradeList = ref([])

    const setGradeList = () => {
        getGradeList({schoolId, majorId}).then(res => {
            if(res.code === 200) {
                gradeList.value = res.data.rows
            }
        })
    }

    onMounted(setGradeList)

    return {
        gradeList
    }
}