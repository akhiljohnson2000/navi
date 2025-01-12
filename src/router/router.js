import { createRouter, createWebHistory } from 'vue-router'
import CodingDocs from '@/components/CodingDocs.vue'
import HtmlNotes from '@/components/coding_docs/HtmlNotes.vue'
import JsNotes from '@/components/coding_docs/JsNotes.vue'
import WorkoutComponent from '@/components/WorkoutComponent.vue'
import SomeCoolWorks from '@/components/SomeCoolWorks.vue'
import CssNotes from '@/components/coding_docs/CssNotes.vue'
import ES6Notes from '@/components/coding_docs/ES6Notes.vue'
import AngularNotes from '@/components/coding_docs/angularNotes.vue'
import ComparisonNotes from '@/components/coding_docs/comparisonNotes.vue'
import ReactNotes from '@/components/coding_docs/reactNotes.vue'
import NextjsNotes from '@/components/coding_docs/nextjsNotes.vue'
import TestingNotes from '@/components/coding_docs/testingNotes.vue'
import DeploymentNotes from '@/components/coding_docs/deploymentNotes.vue'
import GeneralTopicNotes from '@/components/coding_docs/generalTopicNotes.vue'
import DockerNotes from '@/components/coding_docs/dockerNotes.vue'

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
        { path: 'css', component: CssNotes },
        { path: 'es6', component: ES6Notes },
        { path: 'js', component: JsNotes },
        { path: 'angular', component: AngularNotes },
        { path: 'comparision', component: ComparisonNotes },
        { path: 'react', component: ReactNotes },
        { path: 'nextJs', component: NextjsNotes },
        { path: 'testing', component: TestingNotes },
        { path: 'deployment', component: DeploymentNotes },
        { path: 'general', component: GeneralTopicNotes },
        { path: 'docker', component: DockerNotes }
      ],
    },
    {
        path: '/cool-works',
        component: SomeCoolWorks,
    },
  ],
})
