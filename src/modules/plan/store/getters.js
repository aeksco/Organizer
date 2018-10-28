import _ from 'lodash'
import Unify from '@/utils/unify'

export default {
  uniqueSemesters: (state) => {
    let list = []
    state.semesters.forEach((s) => {
      list.push(parseInt(s.year) * 10 + _.indexOf(Unify.PERIOD, s.period))
    })
    return list
  },
  getYearSpan: () => {
    let startYear = Unify.DEFAULT_YEAR
    return _.range(startYear, startYear + Unify.YEAR_SPAN)
  },
  getSelectablePeriod: (state, getters) => (year) => {
    let arr = _.cloneDeep(Unify.PERIOD) // Export will cause a shadow clone, which makes it an empty array.
    return _.remove(arr, (p) => {
      return _.indexOf(getters.uniqueSemesters, Unify.SEMESTER_UID(year, p)) === -1
    })
  },
  semesterList: (state) => {
    return _.map(state.semesters, (s, i) => {
      return {
        text: s.year + ' ' + s.period,
        value: i
      }
    })
  },
  findCourse: (state) => (uuid) => {
    // Even though course should appear only once, we collect every possible answers.
    // if (_.startsWith(courseTitle, Unify.CUSTOM_COURSE_PREFIX)) {
    //   // Igore Custom Course
    //   return []
    // } else {
    // }
    let semesters = []
    state.semesters.forEach((s, i) => {
      let index = _.findIndex(s.courses, ['uuid', uuid])
      if (index !== -1) {
        semesters.push(i)
      }
    })
    // Transferred
    let i = _.findIndex(state.transferred, ['uuid', uuid])
    if (i !== -1) {
      semesters.push(-1)
    }
    return semesters

  },
  findSemester: (state) => (semester) => {
    return _.findIndex(state.semesters, semester)
  },
  allCourses: (state) => {
    let courses = []
    state.semesters.forEach((s) => {
      courses = s.courses.concat(s.courses)
    })
    return courses
  },
  renderedSemesters: (state, getters) => {
    // So we pre-rendered all courses before feed into the UI.
    // Find a way to manipulate in different way?
    let rendered = _.cloneDeep(state.semesters)
    state.semesters.forEach((s, si) => {
      s.courses.forEach((c, ci) => {
        if (!c.custom) {
          rendered[si].courses[ci] = {
            ...c,
            ...getters.detailsByUuid(c.uuid)
          }
        }
      })
    })
    return rendered
  },
  renderedTransferred: (state, getters) => {
    let rendered = _.cloneDeep(state.transferred)
    state.transferred.forEach((c, ci) => {
      if (!c.custom) {
        rendered[ci] = {
          ...c,
          ...getters.detailsByUuid(c.uuid)
        }
      }
    })
    return rendered
  }
}