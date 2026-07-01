import React from 'react'
import { CourseDetailsProps } from '../CourseDetails/coursedetails.types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'

export default function CourseDetailsOverview({ data }: CourseDetailsProps) {
  return (
    <section className='mt-5 px-5'>
      <article>
        <h2 className='text-foreground text-3xl font-bold'>
          What You'll Learn
        </h2>
        <div className="list">
          <ul className='my-3 md:flex gap-5'>
            <div>
              <li className='text-(--text-secondary) '><span className='me-2 text-(--primary-hover)'>
                <FontAwesomeIcon icon={faCircleCheck} />
              </span>Build 15+ real-world projects</li>
              <li className='text-(--text-secondary) '><span className='me-2 text-(--primary-hover)'>
                <FontAwesomeIcon icon={faCircleCheck} />
              </span>Get lifetime access to course materials</li>
              <li className='text-(--text-secondary) '><span className='me-2 text-(--primary-hover)'>
                <FontAwesomeIcon icon={faCircleCheck} />
              </span>Access to exclusive community</li>
            </div>
            <div>
              <li className='text-(--text-secondary) '><span className='me-2 text-(--primary-hover)'>
                <FontAwesomeIcon icon={faCircleCheck} />
              </span>Learn modern web development technologies</li>
              <li className='text-(--text-secondary) '><span className='me-2 text-(--primary-hover)'>
                <FontAwesomeIcon icon={faCircleCheck} />
              </span>Regular content updates</li>
              <li className='text-(--text-secondary) '><span className='me-2 text-(--primary-hover)'>
                <FontAwesomeIcon icon={faCircleCheck} />
              </span>Certificate of completion</li>
            </div>
          </ul>
        </div>
      </article>
      <article className="descripition w-full">
        <h2 className='text-foreground text-3xl font-bold'>
          Course Description
        </h2>
        <p className='mt-2 whitespace-normal wrap-break-word text-(--text-secondary)'>{data.description}</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur dolores, magnam consequatur sit error cum aliquam aspernatur eos cumque ullam excepturi dolor molestias blanditiis corporis obcaecati accusamus veniam soluta voluptatum.</p>
      </article>
    </section>
  )
}
