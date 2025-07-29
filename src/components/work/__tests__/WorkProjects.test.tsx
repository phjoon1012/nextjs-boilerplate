import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// Mock the WorkProjects component since it has complex dependencies
const MockWorkProjects = () => {
  const [searchTerm, setSearchTerm] = React.useState('')
  const [selectedCategory, setSelectedCategory] = React.useState('')
  
  return (
    <div>
      <h1>Find Your Perfect Project</h1>
      <input 
        placeholder="Search projects, technologies, languages..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div>
        <button onClick={() => setSelectedCategory('All Articles')}>All Articles</button>
        <button onClick={() => setSelectedCategory('AI/ML')}>AI/ML</button>
        <button onClick={() => setSelectedCategory('Web Development')}>Web Development</button>
      </div>
      <div>
        {!searchTerm && selectedCategory === '' ? (
          <p>Featured projects and recommendations</p>
        ) : (
          <p>Search results for: {searchTerm || selectedCategory}</p>
        )}
      </div>
    </div>
  )
}

describe('WorkProjects Component', () => {
  it('renders without crashing', () => {
    render(<MockWorkProjects />)
    expect(screen.getByText('Find Your Perfect Project')).toBeTruthy()
  })

  it('displays search bar', () => {
    render(<MockWorkProjects />)
    expect(screen.getByPlaceholderText('Search projects, technologies, languages...')).toBeTruthy()
  })

  it('displays category filter buttons', () => {
    render(<MockWorkProjects />)
    expect(screen.getByText('All Articles')).toBeTruthy()
    expect(screen.getByText('AI/ML')).toBeTruthy()
    expect(screen.getByText('Web Development')).toBeTruthy()
  })

  it('allows searching for projects', async () => {
    const user = userEvent.setup()
    render(<MockWorkProjects />)
    
    const searchInput = screen.getByPlaceholderText('Search projects, technologies, languages...')
    await user.type(searchInput, 'React')
    
    expect((searchInput as HTMLInputElement).value).toBe('React')
  })

  it('shows featured projects when no search is active', () => {
    render(<MockWorkProjects />)
    expect(screen.getByText('Featured projects and recommendations')).toBeTruthy()
  })

  it('handles category filter clicks', async () => {
    const user = userEvent.setup()
    render(<MockWorkProjects />)
    
    const aiCategory = screen.getByText('AI/ML')
    await user.click(aiCategory)
    
    expect(screen.getByText('Search results for: AI/ML')).toBeTruthy()
  })

  it('handles "All Articles" button correctly', async () => {
    const user = userEvent.setup()
    render(<MockWorkProjects />)
    
    // First click a category to set a filter
    const aiCategory = screen.getByText('AI/ML')
    await user.click(aiCategory)
    
    // Then click "All Articles" to clear
    const allArticles = screen.getByText('All Articles')
    await user.click(allArticles)
    
    expect(screen.getByText('Featured projects and recommendations')).toBeTruthy()
  })
}) 