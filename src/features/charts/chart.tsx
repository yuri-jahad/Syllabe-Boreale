// ===== IMPORTS =====
import { memo } from 'react'
import Header from '@shared/components/header/header'
import PanelInfos from '@shared/components/panel-infos/panel-infos'
import NavigationPanel from '@shared/components/panel-navigation/navigation-panel'
import ListsGallery from '@shared/components/lists-gallery/lists-gallery'
import {
  DashboardBackgroundCSS,
  DashboardCentralCSS
} from '@shared/generic/generic.style'

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
  height: '30vh',
  backgroundColor: '#111827',
  borderRadius: 'lg',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.6)',
  border: '1px solid #1F2937',
  transition: 'all 0.2s ease'
})

const statsContainerStyle = css({
  display: 'flex',
  gap: '1',
  width: '80vw',
  margin: '0 auto'
})

const statsItemStyle = css({
  flex: '1',
  padding: '3',
  backgroundColor: '#111827',
  borderRadius: 'md',
  border: '1px solid #1F2937',
  textAlign: 'center'
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
  gridTemplateColumns: {
    base: '1fr',
    md: 'repeat(2, minmax(0, 0.8fr))',
    lg: 'repeat(2, minmax(0, 0.8fr))'
  },
  gap: '2',
  width: '80vw',
  margin: '0 auto',
  justifyContent: 'center'
})

const loadingStyle = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '31vh',
  fontSize: 'md',
  color: '#718096',
  backgroundColor: '#111827',
  borderRadius: 'lg',
  border: '1px solid #1F2937'
})

const mainContentStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '2'
})

const headerSectionStyle = css({
  display: 'flex',
  flexDirection: { base: 'column', md: 'row' },
  gap: '3',
  alignItems: { md: 'center' },
  justifyContent: 'space-between',
  marginBottom: '3'
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

const ChartWrapper = ({ title, children }) => (
  <div className={chartContainerStyle}>
    <h3 className={chartTitleStyle}>{title}</h3>
    <div style={{ height: 'calc(100% - 45px)' }}>
      <ResponsiveContainer width='95%' height='100%'>
        {children}
      </ResponsiveContainer>
    </div>
  </div>
)

const NoData = ({ label }) => (
  <div className={chartContainerStyle}>
    <div className={loadingStyle}>
      <div style={{ textAlign: 'center' }}>
        <div
          style={{ fontSize: '1rem', marginBottom: '0.5rem', color: '#4A5568' }}
        >
          •••
        </div>
        <div style={{ fontSize: '0.875rem' }}>Aucune donnée disponible</div>
        <div
          style={{ fontSize: '0.75rem', opacity: 0.7, marginTop: '0.25rem' }}
        >
          pour {label}
        </div>
      </div>
    </div>
  </div>
)

// ===== COMPOSANTS STATS EN LIGNE =====
const StatsDisplay = memo(() => {
  const { data } = useSession()
  const { currentList } = useStore()

  const counts = data?.data.allListsDetails.counts
  const totalWords = parseInt(counts?.word || '0')
  const currentCount = parseInt(counts?.[currentList] || '0')
  const countNumber = parseInt(currentCount)

  let percentage = 0
  if (totalWords > 0) {
    percentage = (currentCount / totalWords) * 100
  }

  return (
    <div className={statsContainerStyle}>
      <div className={statsItemStyle}>
        <div className={statsLabelStyle}>Mots dans {currentList}</div>
        <div className={statsValueStyle}>{countNumber.toLocaleString()}</div>
        <div className={statsSubtitleStyle}>
          {countNumber === 0 ? 'aucun mot' : countNumber === 1 ? 'mot' : 'mots'}
        </div>
      </div>

      <div className={statsItemStyle}>
        <div className={statsLabelStyle}>Pourcentage du total</div>
        <div className={statsPercentageStyle}>
          {totalWords === 0
            ? '0%'
            : percentage < 0.01 && percentage > 0
            ? '<0.01%'
            : `${percentage.toFixed(2)}%`}
        </div>
        <div className={statsSubtitleStyle}>
          {totalWords === 0
            ? 'Aucune donnée'
            : `${currentCount.toLocaleString()} / ${totalWords.toLocaleString()}`}
        </div>
      </div>
    </div>
  )
})

// ===== COMPOSANTS GRAPHIQUES ÉPURÉS =====
const LettersChart = memo(() => {
  const { data } = useSession()
  const { currentList } = useStore()
  const chartData = data?.data?.alphabet?.[currentList]

  if (!chartData?.length) return <NoData label={currentList} />

  return (
    <ChartWrapper title={`Distribution des lettres - ${currentList}`}>
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
          name='Mots'
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
    <ChartWrapper title={`Syllabes rares - ${currentList}`}>
      <AreaChart
        data={chartData}
        margin={{ top: 10, right: 15, left: 15, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray='2 2' stroke='#374151' opacity={0.5} />
        <XAxis dataKey='wordsPerSyllable' {...axisConfig} />
        <YAxis {...axisConfig} />
        <Tooltip
          {...tooltipConfig}
          formatter={value => [value, 'Syllabes']}
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
    <ChartWrapper title={`Distribution des longueurs - ${currentList}`}>
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
          name='Mots'
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
    <ChartWrapper title={`Lettres uniques - ${currentList}`}>
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
          name='Mots'
        />
      </LineChart>
    </ChartWrapper>
  )
})

// ===== COMPOSANT PRINCIPAL =====
export default function Chart () {
  const { data, isLoading, error } = useSession()
  const { currentList } = useStore()

  if (isLoading) {
    return (
      <div className={DashboardBackgroundCSS}>
        <Header />
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
            <div>Chargement des données...</div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={DashboardBackgroundCSS}>
        <Header />
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
            <div>Erreur lors du chargement des données</div>
          </div>
        </div>
      </div>
    )
  }

  if (!currentList) {
    return (
      <div className={DashboardBackgroundCSS}>
        <Header />
        <div style={{ display: 'flex' }}>
          <NavigationPanel />
          <div className={DashboardCentralCSS}>
            <div className={headerSectionStyle}>
              <ListsGallery />
              <PanelInfos />
            </div>
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
                <div>Sélectionnez une liste pour voir les graphiques</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={DashboardBackgroundCSS}>
      <Header />
      <div style={{ display: 'flex' }}>
        <NavigationPanel />
        <div className={DashboardCentralCSS}>
          <div className={mainContentStyle}>
            <div className={headerSectionStyle}>
              <PanelInfos />
            </div>
            <StatsDisplay />
            <div className={chartsGridStyle}>
              <LettersChart />
              <SyllablesBottomChart />
              <UniqueLettersChart />
              <WordLengthsChart />
              <ListsGallery />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
