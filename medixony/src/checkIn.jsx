import { useMemo, useState } from 'react'
import './checkin.css'

const TOTAL_STEPS = 8

const lifeStages = [
  {
    id: 'school',
    icon: '🎒',
    title: 'School',
    text: 'School, exams & growing up',
  },
  {
    id: 'college',
    icon: '🎓',
    title: 'College',
    text: 'Studies, career & independence',
  },
  {
    id: 'working',
    icon: '💼',
    title: 'Working',
    text: 'Work, balance & responsibilities',
  },
  {
    id: 'parent',
    icon: '🏠',
    title: 'Adult / Parent',
    text: 'Family, responsibilities & life',
  },
  {
    id: 'senior',
    icon: '🌿',
    title: 'Senior',
    text: 'Connection, routine & purpose',
  },
  {
    id: 'private',
    icon: '✨',
    title: 'Prefer not to say',
    text: 'Keep this part private',
  },
]

const concerns = [
  { id: 'studies', icon: '🎓', title: 'Studies' },
  { id: 'work', icon: '💼', title: 'Work' },
  { id: 'relationship', icon: '❤️', title: 'Relationship' },
  { id: 'family', icon: '🏠', title: 'Family' },
  { id: 'money', icon: '💰', title: 'Money' },
  { id: 'loneliness', icon: '🧍', title: 'Loneliness' },
  { id: 'sleep', icon: '😴', title: 'Sleep' },
  { id: 'overthinking', icon: '🧠', title: 'Overthinking' },
  { id: 'motivation', icon: '🎯', title: 'Motivation' },
  { id: 'unknown', icon: '🤷', title: "I don't know" },
  { id: 'other', icon: '＋', title: 'Something else' },
]

const studyIssues = [
  'Can’t concentrate',
  'Too much workload',
  'Fear of failure',
  'Comparison with others',
  'Lack of motivation',
  "Don't know where to start",
]

const generalIssues = [
  'I feel overwhelmed',
  'I keep thinking about it',
  'I feel disconnected',
  'I don’t feel motivated',
  'It is affecting my routine',
  'I’m not sure what I need',
]

const impacts = [
  'Sleep',
  'Mood',
  'Appetite',
  'Relationships',
  'Confidence',
  'Daily routine',
  'Nothing major',
]

const timeOptions = [
  {
    id: '5',
    icon: '◷',
    title: '5 minutes',
    text: 'A tiny reset',
  },
  {
    id: '10',
    icon: '◷',
    title: '10 minutes',
    text: 'A little breathing room',
  },
  {
    id: '20',
    icon: '◷',
    title: '20 minutes',
    text: 'Some intentional time',
  },
  {
    id: '30',
    icon: '◷',
    title: '30+ minutes',
    text: 'I have more time',
  },
]

const budgetOptions = [
  {
    id: 'free',
    icon: '₹0',
    title: '₹0',
    text: 'Free activities & resources',
  },
  {
    id: '100',
    icon: '₹',
    title: 'Under ₹100',
    text: 'Low-cost options',
  },
  {
    id: '500',
    icon: '₹₹',
    title: '₹100–₹500',
    text: 'Affordable options',
  },
  {
    id: 'more',
    icon: '₹+',
    title: '₹500+',
    text: 'Professional or premium support',
  },
]

const preferenceOptions = [
  {
    id: 'calm',
    icon: '🧘',
    title: 'Something calming',
  },
  {
    id: 'audio',
    icon: '🎧',
    title: 'Something I can listen to',
  },
  {
    id: 'physical',
    icon: '🚶',
    title: 'Something physical',
  },
  {
    id: 'write',
    icon: '✍️',
    title: 'Something I can write',
  },
  {
    id: 'social',
    icon: '🫂',
    title: 'Someone to talk to',
  },
  {
    id: 'interactive',
    icon: '🎮',
    title: 'Something interactive',
  },
  {
    id: 'decide',
    icon: '🤍',
    title: 'You decide',
  },
]

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  )
}

function BackIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 12H5M11 6l-6 6 6 6" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m5 12 4 4L19 6" />
    </svg>
  )
}

function CheckIn() {
  const [step, setStep] = useState(1)
  const [feedback, setFeedback] = useState(null)

  const [data, setData] = useState({
    name: '',
    anonymous: false,
    lifeStage: '',
    concern: '',
    issue: '',
    impacts: [],
    time: '',
    budget: '',
    preference: '',
    noDiagnosis: false,
  })

  const update = (field, value) => {
    setData((current) => ({
      ...current,
      [field]: value,
    }))
  }

  const toggleImpact = (value) => {
    setData((current) => ({
      ...current,
      impacts: current.impacts.includes(value)
        ? current.impacts.filter((item) => item !== value)
        : [...current.impacts, value],
    }))
  }

  const concernTitle = useMemo(() => {
    const concern = concerns.find(
      (item) => item.id === data.concern
    )

    return concern?.title || 'what you are carrying'
  }, [data.concern])

  const canContinue = () => {
    if (step === 1) {
      return data.name.trim().length > 0 || data.anonymous
    }

    if (step === 2) {
      return Boolean(data.lifeStage)
    }

    if (step === 3) {
      return Boolean(data.concern)
    }

    if (step === 4) {
      return Boolean(data.issue)
    }

    if (step === 5) {
      return data.impacts.length > 0
    }

    if (step === 6) {
      return Boolean(data.time)
    }

    if (step === 7) {
      return Boolean(data.budget)
    }

    if (step === 8) {
      return Boolean(data.preference)
    }

    return true
  }

  /*
   * IMPORTANT:
   * Step 8 must be allowed to become Step 9.
   * Step 9 is where the snapshot is rendered.
   */
  const nextStep = () => {
    if (!canContinue()) return

    if (step <= TOTAL_STEPS) {
      setStep((current) => current + 1)

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
  }

  const previousStep = () => {
    if (step > 1) {
      setStep((current) => current - 1)

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
  }

  const restart = () => {
    setStep(1)
    setFeedback(null)

    setData({
      name: '',
      anonymous: false,
      lifeStage: '',
      concern: '',
      issue: '',
      impacts: [],
      time: '',
      budget: '',
      preference: '',
      noDiagnosis: false,
    })

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const getRecommendation = () => {
    if (data.preference === 'physical') {
      return {
        type: 'Move gently',
        title: 'Take a short reset walk.',
        description:
          'Step outside or move around for a few minutes without trying to solve everything at once.',
        duration:
          data.time === '5' ? '5 minutes' : '10–20 minutes',
        icon: '🚶',
      }
    }

    if (data.preference === 'social') {
      return {
        type: 'Connect',
        title: 'Reach out to someone you trust.',
        description:
          'You do not need to explain everything. A simple message or short conversation can be enough.',
        duration: '5–15 minutes',
        icon: '🫂',
      }
    }

    if (data.preference === 'write') {
      return {
        type: 'Put it somewhere',
        title: 'Try a short brain-dump.',
        description:
          'Write down everything currently taking up space in your mind. No structure and no judgment.',
        duration:
          data.time === '5' ? '5 minutes' : '10 minutes',
        icon: '✍️',
      }
    }

    if (data.preference === 'audio') {
      return {
        type: 'Listen',
        title: 'Give yourself a few quiet minutes.',
        description:
          'Choose a calming audio exercise and let yourself pause without needing to be productive.',
        duration:
          data.time === '5' ? '5 minutes' : '10 minutes',
        icon: '🎧',
      }
    }

    if (data.concern === 'sleep') {
      return {
        type: 'Slow down',
        title: 'Create a small wind-down ritual.',
        description:
          'Dim the lights, put your phone away and give yourself a few quiet minutes before sleep.',
        duration:
          data.time === '5' ? '5 minutes' : '10 minutes',
        icon: '🌙',
      }
    }

    if (data.concern === 'overthinking') {
      return {
        type: 'Ground yourself',
        title: 'Try a 5–4–3–2–1 grounding reset.',
        description:
          'Notice five things you can see, four you can touch, three you can hear, two you can smell and one you can taste.',
        duration: '5 minutes',
        icon: '🌿',
      }
    }

    if (data.concern === 'motivation') {
      return {
        type: 'Make it smaller',
        title: 'Choose one tiny task.',
        description:
          'Forget the whole list for now. Pick one task that can be started in the next five minutes.',
        duration: '5 minutes',
        icon: '🎯',
      }
    }

    return {
      type: 'Reset',
      title: 'Give yourself a small pause.',
      description:
        'Take a few quiet minutes, breathe slowly and choose one thing you can realistically do next.',
      duration:
        data.time === '5' ? '5 minutes' : '10 minutes',
      icon: '🌱',
    }
  }

  const recommendation = getRecommendation()

  return (
    <div className="checkin-page">

      {/* HEADER */}

      <header className="checkin-header">
        <a href="/" className="checkin-logo">
          <img
            src="/logo-transparent.png"
            alt="Medixony"
          />
        </a>

        <div className="checkin-header-right">
          <span>Private check-in</span>

          <a href="/">Exit</a>
        </div>
      </header>

      {/* PROGRESS */}

      {step <= TOTAL_STEPS && (
        <div className="checkin-progress">
          <div className="progress-meta">
            <span>
              {step === 1
                ? 'A gentle beginning'
                : 'Your check-in'}
            </span>

            <span>
              {step} of {TOTAL_STEPS}
            </span>
          </div>

          <div className="progress-track">
            <div
              className="progress-fill"
              style={{
                width: `${(step / TOTAL_STEPS) * 100}%`,
              }}
            />
          </div>
        </div>
      )}

      <main className="checkin-main">

        {/* STEP 1 */}

        {step === 1 && (
          <section className="checkin-screen intro-screen">

            <div className="checkin-orb">
              ✦
            </div>

            <p className="checkin-eyebrow">
              A gentle beginning
            </p>

            <h1>
              Let's start with
              <br />
              <em>you.</em>
            </h1>

            <p className="checkin-lead">
              This isn't a diagnosis or a test. It's simply a
              conversation to help Medixony understand what
              might be useful for you right now.
            </p>

            <div className="name-box">

              <label htmlFor="name">
                What should we call you?
              </label>

              <input
                id="name"
                type="text"
                value={data.name}
                disabled={data.anonymous}
                placeholder="Your name or nickname"
                onChange={(event) =>
                  update('name', event.target.value)
                }
              />

              <button
                type="button"
                className={
                  data.anonymous
                    ? 'anonymous-option selected'
                    : 'anonymous-option'
                }
                onClick={() => {
                  update(
                    'anonymous',
                    !data.anonymous
                  )

                  if (!data.anonymous) {
                    update('name', '')
                  }
                }}
              >
                <span className="check-circle">
                  {data.anonymous && <CheckIcon />}
                </span>

                Continue anonymously
              </button>
            </div>

            <button
              type="button"
              className="checkin-primary-button"
              disabled={!canContinue()}
              onClick={nextStep}
            >
              Begin my check-in
              <ArrowIcon />
            </button>

            <p className="privacy-note">
              🔒 You choose what to share. No diagnosis is made.
            </p>

          </section>
        )}

        {/* STEP 2 */}

        {step === 2 && (
          <section className="checkin-screen">

            <p className="checkin-eyebrow">
              First, a little context
            </p>

            <h1>
              Which stage of life
              <br />
              are you in?
            </h1>

            <p className="checkin-lead">
              Your answers can adapt depending on what matters
              in your life right now.
            </p>

            <div className="option-grid stage-grid">

              {lifeStages.map((item) => (
                <button
                  type="button"
                  className={
                    data.lifeStage === item.id
                      ? 'option-card selected'
                      : 'option-card'
                  }
                  key={item.id}
                  onClick={() =>
                    update('lifeStage', item.id)
                  }
                >
                  <span className="option-icon">
                    {item.icon}
                  </span>

                  <span className="option-content">
                    <strong>{item.title}</strong>
                    <small>{item.text}</small>
                  </span>

                  <span className="radio-mark">
                    {data.lifeStage === item.id && (
                      <CheckIcon />
                    )}
                  </span>
                </button>
              ))}

            </div>

            <NavigationButtons
              back={previousStep}
              next={nextStep}
              disabled={!canContinue()}
            />

          </section>
        )}

        {/* STEP 3 */}

        {step === 3 && (
          <section className="checkin-screen">

            <p className="checkin-eyebrow">
              What's going on?
            </p>

            <h1>
              What's been taking up
              <br />
              <em>space in your mind?</em>
            </h1>

            <p className="checkin-lead">
              There is no right answer. Choose whatever feels
              closest—or choose “I don't know.”
            </p>

            <div className="concern-grid">

              {concerns.map((item) => (
                <button
                  type="button"
                  className={
                    data.concern === item.id
                      ? 'concern-card selected'
                      : 'concern-card'
                  }
                  key={item.id}
                  onClick={() =>
                    update('concern', item.id)
                  }
                >
                  <span>{item.icon}</span>

                  <strong>{item.title}</strong>

                  {data.concern === item.id && (
                    <i>
                      <CheckIcon />
                    </i>
                  )}
                </button>
              ))}

            </div>

            <div className="signature-option">

              <button
                type="button"
                className={
                  data.noDiagnosis
                    ? 'no-diagnosis-card selected'
                    : 'no-diagnosis-card'
                }
                onClick={() => {
                  update(
                    'noDiagnosis',
                    !data.noDiagnosis
                  )

                  update('concern', 'unknown')
                }}
              >
                <span>🤍</span>

                <div>
                  <strong>
                    I don't want a diagnosis.
                  </strong>

                  <small>
                    I just want to feel a little better.
                  </small>
                </div>

                <b>
                  {data.noDiagnosis && <CheckIcon />}
                </b>

              </button>

            </div>

            <NavigationButtons
              back={previousStep}
              next={nextStep}
              disabled={!canContinue()}
            />

          </section>
        )}

        {/* STEP 4 */}

        {step === 4 && (
          <section className="checkin-screen">

            <p className="checkin-eyebrow">
              Let's understand it a little better
            </p>

            <h1>
              What's bothering you
              <br />
              <em>most?</em>
            </h1>

            <p className="checkin-lead">
              You selected{' '}
              <strong>{concernTitle}</strong>.
              Pick the option that feels closest today.
            </p>

            <div className="vertical-options">

              {(data.concern === 'studies'
                ? studyIssues
                : generalIssues
              ).map((item) => (
                <button
                  type="button"
                  key={item}
                  className={
                    data.issue === item
                      ? 'text-option selected'
                      : 'text-option'
                  }
                  onClick={() =>
                    update('issue', item)
                  }
                >
                  <span>{item}</span>

                  <i>
                    {data.issue === item && (
                      <CheckIcon />
                    )}
                  </i>
                </button>
              ))}

            </div>

            <NavigationButtons
              back={previousStep}
              next={nextStep}
              disabled={!canContinue()}
            />

          </section>
        )}

        {/* STEP 5 */}

        {step === 5 && (
          <section className="checkin-screen">

            <p className="checkin-eyebrow">
              The bigger picture
            </p>

            <h1>
              How has this been
              <br />
              <em>affecting you?</em>
            </h1>

            <p className="checkin-lead">
              Select everything that feels relevant.
              Nothing here is a score.
            </p>

            <div className="impact-grid">

              {impacts.map((item) => (
                <button
                  type="button"
                  className={
                    data.impacts.includes(item)
                      ? 'impact-card selected'
                      : 'impact-card'
                  }
                  key={item}
                  onClick={() =>
                    toggleImpact(item)
                  }
                >
                  <span className="impact-check">
                    {data.impacts.includes(item) && (
                      <CheckIcon />
                    )}
                  </span>

                  {item}
                </button>
              ))}

            </div>

            <NavigationButtons
              back={previousStep}
              next={nextStep}
              disabled={!canContinue()}
            />

          </section>
        )}

        {/* STEP 6 */}

        {step === 6 && (
          <section className="checkin-screen">

            <p className="checkin-eyebrow">
              Make it realistic
            </p>

            <h1>
              How much time can you
              <br />
              realistically give yourself <em>today?</em>
            </h1>

            <p className="checkin-lead">
              We won't recommend a 30-minute activity when
              you only have five.
            </p>

            <div className="option-grid time-grid">

              {timeOptions.map((item) => (
                <button
                  type="button"
                  className={
                    data.time === item.id
                      ? 'option-card selected'
                      : 'option-card'
                  }
                  key={item.id}
                  onClick={() =>
                    update('time', item.id)
                  }
                >
                  <span className="option-icon">
                    {item.icon}
                  </span>

                  <span className="option-content">
                    <strong>{item.title}</strong>
                    <small>{item.text}</small>
                  </span>

                  <span className="radio-mark">
                    {data.time === item.id && (
                      <CheckIcon />
                    )}
                  </span>
                </button>
              ))}

            </div>

            <NavigationButtons
              back={previousStep}
              next={nextStep}
              disabled={!canContinue()}
            />

          </section>
        )}

        {/* STEP 7 */}

        {step === 7 && (
          <section className="checkin-screen">

            <p className="checkin-eyebrow">
              What fits your life?
            </p>

            <h1>
              What kind of budget
              <br />
              <em>feels comfortable?</em>
            </h1>

            <p className="checkin-lead">
              This helps us avoid recommending something
              that doesn't fit your circumstances.
            </p>

            <div className="option-grid budget-grid">

              {budgetOptions.map((item) => (
                <button
                  type="button"
                  className={
                    data.budget === item.id
                      ? 'option-card selected'
                      : 'option-card'
                  }
                  key={item.id}
                  onClick={() =>
                    update('budget', item.id)
                  }
                >
                  <span className="budget-symbol">
                    {item.icon}
                  </span>

                  <span className="option-content">
                    <strong>{item.title}</strong>
                    <small>{item.text}</small>
                  </span>

                  <span className="radio-mark">
                    {data.budget === item.id && (
                      <CheckIcon />
                    )}
                  </span>
                </button>
              ))}

            </div>

            <NavigationButtons
              back={previousStep}
              next={nextStep}
              disabled={!canContinue()}
            />

          </section>
        )}

        {/* STEP 8 */}

        {step === 8 && (
          <section className="checkin-screen">

            <p className="checkin-eyebrow">
              One last thing
            </p>

            <h1>
              What kind of help would
              <br />
              you actually <em>try?</em>
            </h1>

            <p className="checkin-lead">
              There is no “best” option. Choose what feels
              realistic for you.
            </p>

            <div className="preference-grid">

              {preferenceOptions.map((item) => (
                <button
                  type="button"
                  className={
                    data.preference === item.id
                      ? 'preference-card selected'
                      : 'preference-card'
                  }
                  key={item.id}
                  onClick={() =>
                    update('preference', item.id)
                  }
                >
                  <span>{item.icon}</span>

                  <strong>{item.title}</strong>

                  {data.preference === item.id && (
                    <i>
                      <CheckIcon />
                    </i>
                  )}
                </button>
              ))}

            </div>

            <NavigationButtons
              back={previousStep}
              next={nextStep}
              disabled={!canContinue()}
              label="See my snapshot"
            />

          </section>
        )}

        {/* =====================================================
            SNAPSHOT / RESULTS
            ===================================================== */}

        {step > TOTAL_STEPS && (
          <section className="results-screen">

            <div className="results-hero">

              <div className="results-spark">
                ✦
              </div>

              <p className="checkin-eyebrow">
                Your well-being snapshot
              </p>

              <h1>
                Your puzzle isn't broken.
                <br />
                <em>A few pieces may need attention.</em>
              </h1>

              <p>
                {data.name && !data.anonymous
                  ? `${data.name}, `
                  : ''}
                based on what you shared, here are a few areas
                that may deserve some gentle attention.
              </p>

            </div>

            {/* SNAPSHOT CARDS */}

            <div className="snapshot-grid">

              <SnapshotCard
                icon="🧠"
                title="Mind"
                status="Could use attention"
                text={
                  data.concern === 'overthinking'
                    ? 'Your thoughts seem to be taking up considerable space right now.'
                    : 'There may be some mental pressure worth paying attention to.'
                }
              />

              <SnapshotCard
                icon="😴"
                title="Sleep"
                status={
                  data.impacts.includes('Sleep')
                    ? 'Could use attention'
                    : 'Doing okay'
                }
                text={
                  data.impacts.includes('Sleep')
                    ? 'Your current situation may be affecting your rest.'
                    : 'Sleep does not appear to be your main focus right now.'
                }
              />

              <SnapshotCard
                icon="🫂"
                title="Social connection"
                status={
                  data.concern === 'loneliness'
                    ? 'Could use attention'
                    : 'Doing okay'
                }
                text={
                  data.concern === 'loneliness'
                    ? 'A little intentional connection may help you feel less alone.'
                    : 'Connection does not appear to be your main concern today.'
                }
              />

              <SnapshotCard
                icon="🎯"
                title="Study / Work"
                status={
                  data.concern === 'studies' ||
                  data.concern === 'work'
                    ? 'Could use attention'
                    : 'Doing okay'
                }
                text={
                  data.concern === 'studies' ||
                  data.concern === 'work'
                    ? 'Your responsibilities seem to be taking up some mental space.'
                    : 'This does not seem to be your main focus right now.'
                }
              />

              <SnapshotCard
                icon="❤️"
                title="Relationships"
                status={
                  data.concern === 'relationship'
                    ? 'Could use attention'
                    : 'Doing okay'
                }
                text="Your relationships are one part of the wider picture of well-being."
              />

              <SnapshotCard
                icon="🌿"
                title="Daily rhythm"
                status={
                  data.impacts.includes('Daily routine')
                    ? 'Could use attention'
                    : 'Doing okay'
                }
                text="Small changes to your daily rhythm can sometimes create useful breathing room."
              />

            </div>

            {/* RECOMMENDATION */}

            <section className="recommendation-section">

              <div className="recommendation-heading">

                <p className="checkin-eyebrow">
                  What can I do right now?
                </p>

                <h2>
                  One small step,
                  <br />
                  <em>made for today.</em>
                </h2>

                <p>
                  Based on your situation, available time,
                  budget and preference, this is one place to start.
                </p>

              </div>

              <article className="recommendation-card">

                <div className="recommendation-icon">
                  {recommendation.icon}
                </div>

                <div className="recommendation-content">

                  <span>
                    {recommendation.type}
                  </span>

                  <h3>
                    {recommendation.title}
                  </h3>

                  <p>
                    {recommendation.description}
                  </p>

                  <div className="recommendation-meta">

                    <span>
                      ⏱ {recommendation.duration}
                    </span>

                    <span>
                      ₹ {data.budget === 'free'
                        ? '0'
                        : 'Flexible'}
                    </span>

                  </div>

                </div>

              </article>

              {/* FEEDBACK */}

              <div className="feedback-box">

                <div>
                  <strong>
                    Did this help?
                  </strong>

                  <span>
                    Your feedback helps Medixony learn
                    what works better for you.
                  </span>
                </div>

                <div className="feedback-actions">

                  {[
                    ['helped', '❤️', 'Helped'],
                    ['little', '🙂', 'A little'],
                    ['same', '😐', 'Not really'],
                    ['no', '✕', "Didn't help"],
                  ].map(([id, icon, label]) => (

                    <button
                      type="button"
                      className={
                        feedback === id
                          ? 'feedback-button selected'
                          : 'feedback-button'
                      }
                      key={id}
                      onClick={() =>
                        setFeedback(id)
                      }
                    >
                      <span>{icon}</span>
                      {label}
                    </button>

                  ))}

                </div>

                {feedback && (
                  <p className="feedback-response">
                    {feedback === 'helped'
                      ? 'That’s lovely to hear. We’ll keep this kind of support in mind.'
                      : 'Thank you for telling us. Something different may fit you better.'}
                  </p>
                )}

              </div>

            </section>

            {/* SURPRISE ME */}

            <section className="surprise-section">

              <div className="surprise-icon">
                🎲
              </div>

              <div>

                <p className="checkin-eyebrow">
                  Don't know what you need?
                </p>

                <h2>
                  Let Medixony
                  <br />
                  <em>surprise you.</em>
                </h2>

                <p>
                  Get one tiny activity without having to figure
                  everything out first.
                </p>

              </div>

              <button
                type="button"
                className="surprise-button"
                onClick={() =>
                  alert(
                    'Your 3-minute reset: put your phone down. Name 5 things you can see, 4 things you can touch, and 3 things you can hear.'
                  )
                }
              >
                Surprise Me
                <ArrowIcon />
              </button>

            </section>

            {/* SAFETY */}

            <section className="results-safety">

              <span>♡</span>

              <div>

                <strong>
                  Sometimes self-care isn't enough.
                </strong>

                <p>
                  Medixony is a well-being support tool,
                  not a diagnostic service. If you're experiencing
                  severe distress or feel unsafe, consider reaching
                  out to someone you trust or a qualified professional.
                </p>

              </div>

            </section>

            {/* ACTIONS */}

            <div className="results-actions">

              <button
                type="button"
                className="secondary-result-button"
                onClick={() =>
                  setStep(TOTAL_STEPS)
                }
              >
                <BackIcon />
                Review answers
              </button>

              <button
                type="button"
                className="primary-result-button"
                onClick={restart}
              >
                Start again
                <ArrowIcon />
              </button>

            </div>

          </section>
        )}

      </main>

      {/* FOOTER */}

      {step <= TOTAL_STEPS && (
        <footer className="checkin-footer">

          <span>
            Medixony · Understand yourself. Care for yourself.
          </span>

          <span>
            Your responses are for well-being guidance, not diagnosis.
          </span>

        </footer>
      )}

    </div>
  )
}


/* =========================================================
   NAVIGATION BUTTONS
   ========================================================= */

function NavigationButtons({
  back,
  next,
  disabled,
  label = 'Continue',
}) {
  return (
    <div className="navigation-buttons">

      <button
        type="button"
        className="back-button"
        onClick={back}
      >
        <BackIcon />
        Back
      </button>

      <button
        type="button"
        className="continue-button"
        disabled={disabled}
        onClick={next}
      >
        {label}
        <ArrowIcon />
      </button>

    </div>
  )
}


/* =========================================================
   SNAPSHOT CARD
   ========================================================= */

function SnapshotCard({
  icon,
  title,
  status,
  text,
}) {
  return (
    <article className="snapshot-card">

      <div className="snapshot-top">

        <span className="snapshot-icon">
          {icon}
        </span>

        <span
          className={
            status === 'Doing okay'
              ? 'snapshot-status okay'
              : 'snapshot-status'
          }
        >
          {status}
        </span>

      </div>

      <h3>{title}</h3>

      <p>{text}</p>

    </article>
  )
}

export default CheckIn