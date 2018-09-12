<template>
  <div>
    <h2>Work Experience</h2>
    <div v-for="job in filteredJobs">
      <div class="experience-item">
        <div class="flex-row d-md-flex">
          <div class="flex-column">
            <div>
              <span class="company">{{ job.company }}</span>,
              <span class="title">{{ job.title }}</span>
            </div>
            <div>
              <span class="location">{{ job.location }}</span>
            </div>
          </div>
          <div class="flex-column ml-auto justify-content-end">
            <div class="text-md-right d-inline-block d-md-block">
              <span>{{ job.start.month }}</span>
              <span>&nbsp;</span>
              <span>{{ job.start.year }}</span>
              &ndash;
              <span v-if="!job.end">Present</span>
              <span v-if="!!job.end">
                <span>{{ job.end.month }}</span>
                <span>&nbsp;</span>
                <span>{{ job.end.year }}</span>
              </span>
            </div>
            <div class="text-right d-inline-block d-md-block ml-2 ml-md-0">
              <small class="text-muted">
                <span>{{ computeDurationWorked(job) }}</span>
              </small>
            </div>
          </div>
        </div>
        <div class="flex-column">
          <span v-for="language in job.languages">
            <span class="badge badge-primary">{{ formatLanguage(language) }}</span>
            <span>&nbsp;</span>
          </span>
          <span v-for="skill in job.skills">
            <span class="badge badge-success">{{ skill }}</span>
            <span>&nbsp;</span>
          </span>
        </div>
        <ul>
          <li v-for="achievement in job.achievements">{{ achievement }}</li>
        </ul>
      </div>
    </div>

    <br/>
    <h2>Education</h2>
    <div class="experience-item">
      <div class="inline">
        <div><span class="bold">Northeastern University</span>, Boston, MA</div>
        <div class="italic">College of Computer and Information Science</div>
      </div>
      <div class="inline pull-right">
        <div class="text-right">Graduated May 2011</div>
        <div class="text-right">Dean’s List</div>
      </div>
      <div>Bachelor of Science in Computer Science, Cum Laude</div>
      <div>Master of Science in Computer Science</div>
      <div class="indented">
        Relevant courses: Fundamentals of Computer Science, Discrete Structures, Symbolic Logic, Theory of Computation, Computer Organization, Systems and Networks, Object-Oriented Design, Advanced Writing for Technical Professions, Algorithms (Graduate), Programming Languages (Graduate), Machine Learning (Graduate)
      </div>
    </div>

  </div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import { JOBS, Job } from '@/data/experience';
import { DateMath } from '@/helpers/dates';
import { ProgrammingLanguages } from '@/data/languages';

@Component({})
export default class Experience extends Vue {
  protected get filteredJobs(): Job[] {
    return JOBS.filter((job) => !job.hidden);
  }

  protected computeDurationWorked(job: Job): string {
    return DateMath.durationString(job.start, job.end);
  }

  protected formatLanguage(language: ProgrammingLanguages.Language[]|ProgrammingLanguages.Language): string {
    if (typeof language === 'string') {
      return language;
    } else {
      return language.join('/');
    }
  }
}

</script>