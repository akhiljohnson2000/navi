import { createRouter, createWebHistory } from 'vue-router'
import CodingDocs from '@/components/CodingDocs.vue'
import HtmlNotes from '@/components/coding_docs/HtmlNotes.vue'
import JsNotes from '@/components/coding_docs/JsNotes.vue'
import WorkoutComponent from '@/components/WorkoutComponent.vue'

export const AppRouter = createRouter({
  history: createWebHistory(),
  routes: [
    {
        path: '/workout',
        component: WorkoutComponent,
      },
    {
      path: '/docs/',
      component: CodingDocs,
      children: [
        { path: 'html', component: HtmlNotes },
        { path: 'js', component: JsNotes }
      ],
    },
  ],
})
