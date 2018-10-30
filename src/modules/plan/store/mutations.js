import Unify from '@/utils/unify'
import Vue from 'vue'

export default {
  // {semester: {}, index: Number}
  addSemester(state, payload) {
    state.semesters.splice(payload.index, 0, payload.semester)
  },
  removeSemester(state, index) {
    Vue.delete(state.semesters, index)
  },
  // {semester: Index of Semester (Number), course: {}}
  addCourse(state, payload) {
    if (payload.semester === Unify.TRANSFERRED_SEMESTER_INDEX) {
      state.transferred.push(payload.course)
    } else {
      state.semesters[payload.semester].courses.push(payload.course)
    }
  },
  // {semester: Index of Semester (Number), course: Index of Course (Number)}
  removeCourse(state, payload) {
    if (payload.semester === Unify.TRANSFERRED_SEMESTER_INDEX) {
      state.transferred.splice(payload.course, 1)
    } else {
      state.semesters[payload.semester].courses.splice(payload.course, 1)
    }
  },
  // {semesterIndex: Index of Semester, courseIndex: Index of Course, course: {}}
  replaceCourse(state, payload) {
    if (payload.semesterIndex === Unify.TRANSFERRED_SEMESTER_INDEX) {
      Vue.set(state.transferred, payload.courseIndex, payload.course)
    } else {
      Vue.set(state.semesters[payload.semesterIndex].courses, payload.courseIndex, payload.course)
    }
  },
  // {semester: Index of Semester (Number), courses: []}
  updateCourses(state, payload) {
    if (payload.semester === Unify.TRANSFERRED_SEMESTER_INDEX) {
      state.transferred = payload.courses
    } else {
      state.semesters[payload.semester].courses = payload.courses
    }
  },
  cleanTransferredCourse(state) {
    state.transferred = []
  },
  updateName(state, name) {
    state.name = name
  },
  // @TODO, find a way to set the state
  updatePlan(state, plan) {
    state.semesters = plan.semesters
    state.transferred = plan.transferred
    state.name = plan.name
  },
  cleanPlan(state) {
    state.semesters = []
    state.transferred = []
  },
  resetPlan(state) {
    state.name = 'Unnamed Plan'
    state.semesters = []
    state.transferred = []
  }
}
