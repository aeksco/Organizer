<template>
  <div>
    <b-list-group-item
      v-b-popover.hover="{title: currentCourse.CourseTitle,
                          content: 'Credit Hours: ' + currentCourse.CreditHours,
                          delay: { show: 1000, hide: 0 }}"
      :variant="colorToVariant[currentColor]"
      class="list-complete-item d-flex justify-content-between align-items-center"
      @contextmenu.prevent="$refs.menu.open"
    >
      {{ currentCourse.CourseName }}
      <b-btn
        v-b-modal="'semester ' + semesterIndex + ' course ' + courseIndex"
        class="btn-outline-danger"
        variant="danger">
        <font-awesome-icon icon="times" />
      </b-btn>
    </b-list-group-item>
    <remove-course-modal
      :semester-index="semesterIndex"
      :course-index="courseIndex"/>
    <vue-context
      ref="menu">
      <ul>
        <li
          v-for="color in colors"
          :key="color"
          @click="onClick($event.target.innerText)">{{ color }}</li>
      </ul>
    </vue-context>
  </div>
</template>

<script>
import {
  VueContext
} from 'vue-context'
import RemoveCourseModal from '../Modals/RemoveCourseModal'

export default {
  name: 'Course',
  components: {
    RemoveCourseModal,
    VueContext,
  },
  props: {
    CourseName: {
      type: String,
      default: 'Unknown Course'
    },
    CourseTitle: {
      type: String,
      default: 'Unknown Title'
    },
    CreditHours: {
      type: String,
      default: '0'
    },
    custom: {
      type: Boolean,
      default: false
    },
    uuid: {
      type: String,
      default: '_CUSTOM'
    },
    color: {
      type: String,
      default: 'white'
    },
    semesterIndex: {
      type: Number,
      required: true
    },
    courseIndex: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      colors: [
        'Red',
        'Green',
        'Blue',
        'Yellow',
        'White'
      ],
      colorToVariant: {
        Red: 'danger',
        Yellow: 'warning',
        Blue: 'primary',
        Green: 'success',
        White: 'white'
      }
    }
  },
  computed: {
    currentColor () {
      return this.color === null ? 'white' : this.color
    },
    currentCourse () {
      if (this.custom){
        return {
          CourseName: this.CourseName,
          CourseTitle: this.CourseTitle,
          CreditHours: this.CreditHours
        }
      } else {
        return {
          ...this.$store.getters.detailsByUuid(this.uuid)
        }
      }
    }
  },
  methods: {
     onClick (text) {
       this.$store.dispatch('updateCourseColor', {
         semesterIndex: this.semesterIndex,
         courseIndex: this.courseIndex,
         color: text
       })
    }
  }
}
</script>
