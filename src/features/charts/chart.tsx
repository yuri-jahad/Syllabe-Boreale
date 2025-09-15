import { memo } from 'react'
import Scene from '@shared/components/scene/scene'
import ListsGallery from '@shared/components/lists-gallery/lists-gallery'

import { useSession } from '@shared/hooks/shared-session.hook'
import { useStore } from '@/store/store'
import { css } from '~styled-system/css'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts'

const CHART_COLORS = {
  primary: '#4299E1',
  secondary: '#48BB78',
  accent: '#ED8936',
  pink: '#ED64A6',
  purple: '#9F7AEA',
  teal: '#38B2AC'
}

const chartContainerStyle = css({
  height: '32vh',
  width: '100%',
  maxWidth: '100%',
  backgroundColor: '#111827',
  borderRadius: 'lg',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.6)',
  border: '1px solid #1F2937',
  transition: 'all 0.2s ease',
  overflow: 'hidden',

  '@media (max-width: 768px)': {
    height: '28vh',
    width:'80vw'
  },

  '@media (max-width: 480px)': {
    height: '25vh'
  }
})

const statsContainerStyle = css({
  display: 'flex',
  gap: '4',
  width: '100%',
  margin: '0 auto 8px auto',
  '@media (max-width: 768px)': {
    flexDirection: 'column',
    gap: '2'
  }
})

const statsItemStyle = css({
  flex: '1',
  padding: '2',
  backgroundColor: '#111827',
  borderRadius: 'md',
  border: '1px solid #1F2937',
  textAlign: 'center',
  minWidth: '0'
})

const chartTitleStyle = css({
  textAlign: 'center',
  marginBottom: '2',
  fontSize: 'md',
  fontWeight: '600',
  color: '#D1D5DB',
  letterSpacing: '0.025em'
})

const chartsGridStyle = css({
  display: 'grid',
  gap: '2',
  width: '100%',
  maxWidth: '100%',

  gridTemplateColumns: '1fr',

  '@media (min-width: 768px)': {
    gridTemplateColumns: 'repeat(2, 1fr)'
  },

  '@media (min-width: 1024px)': {
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridTemplateRows: 'repeat(3, auto)',
    '& > :nth-child(5)': {
      gridColumn: '1 / -1',
      gridRow: '3'
    }
  }
})

const loadingStyle = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '32vh',
  fontSize: 'md',
  color: '#718096',
  backgroundColor: '#111827',
  borderRadius: 'lg',
  border: '1px solid #1F2937',

  '@media (max-width: 768px)': {
    height: '28vh'
  },

  '@media (max-width: 480px)': {
    height: '25vh'
  }
})

const mainContentStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '2',
  padding: '12px',
  width: '100%',
  height: '100%',
  maxWidth: '100%',
  overflowX: 'hidden'
})

const statsValueStyle = css({
  fontSize: 'xl',
  fontWeight: '700',
  color: '#10B981',
  letterSpacing: '-0.025em',
  lineHeight: '1'
})

const statsPercentageStyle = css({
  fontSize: 'xl',
  fontWeight: '700',
  color: '#3B82F6',
  letterSpacing: '-0.025em',
  lineHeight: '1'
})

const statsLabelStyle = css({
  fontSize: 'sm',
  color: '#E5E7EB',
  textAlign: 'center',
  fontWeight: '500',
  marginBottom: '1'
})

const statsSubtitleStyle = css({
  fontSize: 'xs',
  color: '#9CA3AF',
  textAlign: 'center',
  fontWeight: '400',
  marginTop: '1'
})

const axisConfig = {
  tick: { fill: '#9CA3AF', fontSize: 10 },
  axisLine: { stroke: '#374151', strokeWidth: 1 }
}

const tooltipConfig = {
  contentStyle: {
    backgroundColor: '#1F2937',
    border: '1px solid #374151',
    borderRadius: '6px',
    color: '#F3F4F6',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
    fontSize: '12px'
  }
}

const ChartWrapper = ({ title, children } : any) => (
  <div className={chartContainerStyle}>
    <h3 className={chartTitleStyle}>{title}</h3>
    <div style={{ height: 'calc(100% - 45px)', width: '100%' }}>
      <ResponsiveContainer width='100%' height='100%'>
        {children}
      </ResponsiveContainer>
    </div>
  </div>
)

const NoData = ({ label } : any) => (
  <div className={chartContainerStyle}>
    <div className={loadingStyle}>
      <div style={{ textAlign: 'center' }}>
        <div
          style={{ fontSize: '1rem', marginBottom: '0.5rem', color: '#4A5568' }}
        >
          •••
        </div>
        <div style={{ fontSize: '0.875rem' }}>No data available</div>
        <div
          style={{ fontSize: '0.75rem', opacity: 0.7, marginTop: '0.25rem' }}
        >
          for {label}
        </div>
      </div>
    </div>
  </div>
)

const StatsDisplay = memo(() => {
  const { data } = useSession()
  const { currentList } = useStore()

  const counts = data?.data.allListsDetails.counts
  const totalWords = parseInt(counts?.word || '0')
  const currentCount = parseInt(counts?.[currentList] || '0')
  const countNumber = currentCount

  let percentage = 0
  if (totalWords > 0) {
    percentage = (currentCount / totalWords) * 100
  }

  return (
    <div className={statsContainerStyle}>
      <div className={statsItemStyle}>
        <div className={statsLabelStyle}>Words in {currentList}</div>
        <div className={statsValueStyle}>{countNumber.toLocaleString()}</div>
        <div className={statsSubtitleStyle}>
          {countNumber === 0 ? 'no words' : countNumber === 1 ? 'word' : 'words'}
        </div>
      </div>

      <div className={statsItemStyle}>
        <div className={statsLabelStyle}>Percentage of total</div>
        <div className={statsPercentageStyle}>
          {totalWords === 0
            ? '0%'
            : percentage < 0.01 && percentage > 0
            ? '<0.01%'
            : `${percentage.toFixed(2)}%`}
        </div>
        <div className={statsSubtitleStyle}>
          {totalWords === 0
            ? 'No data'
            : `${currentCount.toLocaleString()} / ${totalWords.toLocaleString()}`}
        </div>
      </div>
    </div>
  )
})

const LettersChart = memo(() => {
  const { data } = useSession()
  const { currentList } = useStore()
  const chartData = data?.data?.alphabet?.[currentList]

  if (!chartData?.length) return <NoData label={currentList} />

  return (
    <ChartWrapper title={`Letter distribution - ${currentList}`}>
      <BarChart
        data={chartData}
        margin={{ top: 10, right: 15, left: 15, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray='2 2' stroke='#374151' opacity={0.5} />
        <XAxis dataKey='letter' {...axisConfig} />
        <YAxis {...axisConfig} />
        <Tooltip {...tooltipConfig} />
        <Bar
          dataKey='count'
          fill={CHART_COLORS.primary}
          name='Words'
          radius={[2, 2, 0, 0]}
          opacity={0.9}
        />
      </BarChart>
    </ChartWrapper>
  )
})

const SyllablesBottomChart = memo(() => {
  const { data } = useSession()
  const { currentList } = useStore()
  const chartData = data?.data?.occ?.bottom?.[currentList]

  if (!chartData?.length) return <NoData label={currentList} />

  return (
    <ChartWrapper title={`Rare syllables - ${currentList}`}>
      <AreaChart
        data={chartData}
        margin={{ top: 10, right: 15, left: 15, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray='2 2' stroke='#374151' opacity={0.5} />
        <XAxis dataKey='wordsPerSyllable' {...axisConfig} />
        <YAxis {...axisConfig} />
        <Tooltip
          {...tooltipConfig}
          formatter={value => [value, 'Syllables']}
          labelFormatter={label => `${label} solution${label > 1 ? 's' : ''}`}
        />
        <Area
          type='monotone'
          dataKey='syllablesWithCount'
          stroke={CHART_COLORS.pink}
          strokeWidth={2}
          fill={CHART_COLORS.pink}
          fillOpacity={0.3}
        />
      </AreaChart>
    </ChartWrapper>
  )
})

const WordLengthsChart = memo(() => {
  const { data } = useSession()
  const { currentList } = useStore()
  const chartData = data?.data?.lengths?.[currentList]

  if (!chartData?.length) return <NoData label={currentList} />

  return (
    <ChartWrapper title={`Length distribution - ${currentList}`}>
      <BarChart
        data={chartData}
        margin={{ top: 10, right: 15, left: 15, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray='2 2' stroke='#374151' opacity={0.5} />
        <XAxis dataKey='length' {...axisConfig} />
        <YAxis {...axisConfig} />
        <Tooltip {...tooltipConfig} />
        <Bar
          dataKey='count'
          fill={CHART_COLORS.accent}
          name='Words'
          radius={[2, 2, 0, 0]}
          opacity={0.9}
        />
      </BarChart>
    </ChartWrapper>
  )
})

const UniqueLettersChart = memo(() => {
  const { data } = useSession()
  const { currentList } = useStore()
  const chartData = data?.data?.uniqueLetters?.[currentList]

  if (!chartData?.length) return <NoData label={currentList} />

  return (
    <ChartWrapper title={`Unique letters - ${currentList}`}>
      <LineChart
        data={chartData}
        margin={{ top: 10, right: 15, left: 15, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray='2 2' stroke='#374151' opacity={0.5} />
        <XAxis dataKey='uniqueLetters' {...axisConfig} />
        <YAxis {...axisConfig} />
        <Tooltip {...tooltipConfig} />
        <Line
          type='monotone'
          dataKey='count'
          stroke={CHART_COLORS.purple}
          strokeWidth={2}
          dot={{ fill: CHART_COLORS.purple, strokeWidth: 1, r: 3 }}
          activeDot={{
            r: 4,
            stroke: CHART_COLORS.purple,
            strokeWidth: 1,
            fill: '#111827'
          }}
          name='Words'
        />
      </LineChart>
    </ChartWrapper>
  )
})

const LoadingContent = () => (
  <div className={loadingStyle}>
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          fontSize: '1rem',
          marginBottom: '0.5rem',
          color: '#4A5568'
        }}
      >
        •••
      </div>
      <div>Loading data...</div>
    </div>
  </div>
)

const ErrorContent = () => (
  <div className={loadingStyle}>
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          fontSize: '1rem',
          marginBottom: '0.5rem',
          color: '#E53E3E'
        }}
      >
        ×
      </div>
      <div>Error loading data</div>
    </div>
  </div>
)

const NoListSelected = () => (
  <div className={loadingStyle}>
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          fontSize: '1rem',
          marginBottom: '0.5rem',
          color: '#4A5568'
        }}
      >
        ···
      </div>
      <div>Select a list to view charts</div>
    </div>
  </div>
)

export default function Chart () {
  const { isLoading, error } = useSession()
  const { currentList } = useStore()

  if (isLoading) {
    return (
      <Scene>
        <LoadingContent />
      </Scene>
    )
  }

  if (error) {
    return (
      <Scene>
        <ErrorContent />
      </Scene>
    )
  }

  if (!currentList) {
    return (
      <Scene>
        <NoListSelected />
      </Scene>
    )
  }

  return (
    <Scene>
      <div className={mainContentStyle}>
        <StatsDisplay />
        <div className={chartsGridStyle}>
          <LettersChart />
          <SyllablesBottomChart />
          <UniqueLettersChart />
          <WordLengthsChart />
          <ListsGallery />
        </div>
      </div>
    </Scene>
  )
}