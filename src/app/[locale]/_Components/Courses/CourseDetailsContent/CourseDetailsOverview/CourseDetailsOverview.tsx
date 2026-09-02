import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { CourseDetailsProps } from '../../CourseDetails/coursedetails.types';
import { getTranslations } from 'next-intl/server'

export default async function CourseDetailsOverview({ data,inPlayPage }: CourseDetailsProps) {
  const t = await getTranslations();
  const middle = Math.ceil(data?.objectives.length / 2);
  const firstColumn = data?.objectives.slice(0, middle);
  const secondColumn = data?.objectives.slice(middle);
  return (
    <section className='mt-5 px-5'>
      {!inPlayPage&&<article>
        <h2 className='text-foreground text-3xl font-bold'>
          {t('CourseDetails.whatYoullLearn')}
        </h2>
        <div className="list">
          <ul className="my-3 md:flex gap-5">
            <div className="flex-1">
              {firstColumn?.map((objective, index) => (
                <li key={index} className="text-(--text-secondary)">
                  <span className="me-2 text-(--primary-hover)">
                    <FontAwesomeIcon icon={faCircleCheck} />
                  </span>
                  {objective}
                </li>
              ))}
            </div>

            <div className="flex-1">
              {secondColumn?.map((objective, index) => (
                <li key={middle + index} className="text-(--text-secondary)">
                  <span className="me-2 text-(--primary-hover)">
                    <FontAwesomeIcon icon={faCircleCheck} />
                  </span>
                  {objective}
                </li>
              ))}
            </div>
          </ul>
        </div>
      </article>}
      <article className="descripition w-full">
        <h2 className='text-foreground text-3xl font-bold'>
          {t('CourseDetails.courseDescription')}
        </h2>
        <p className='mt-2 whitespace-normal wrap-break-word text-(--text-secondary)'>{data?.description}</p>
      </article>
    </section>
  )
}