// Fallback storage for when database is unavailable
// This uses in-memory storage as temporary fallback

interface College {
  id: string
  name: string
  slug: string
  description?: string
  city: string
  country: string
  status: 'ACTIVE' | 'INACTIVE' | 'DRAFT'
  featured: boolean
  createdAt: string
  updatedAt: string
}

interface Course {
  id: string
  collegeId: string
  name: string
  duration: string
  fees: number
  createdAt: string
  updatedAt: string
}

interface StorageData {
  colleges: College[]
  courses: Course[]
  specializations: any[]
  leads: any[]
}

class FallbackStorage {
  private static instance: FallbackStorage
  private dataFile = './storage.json'
  private data: StorageData = {
    colleges: [],
    courses: [],
    specializations: [],
    leads: []
  }
  
  private constructor() {
    this.loadFromFile()
  }

  private loadFromFile() {
    try {
      const fs = require('fs')
      if (fs.existsSync(this.dataFile)) {
        const fileData = fs.readFileSync(this.dataFile, 'utf8')
        this.data = JSON.parse(fileData)
        console.log('📂 Loaded data from file:', this.dataFile)
      } else {
        // Initialize with some mock data
        this.data.colleges = [
          {
            id: '1',
            name: 'Harvard University',
            slug: 'harvard-university',
            description: 'Premier Ivy League institution',
            city: 'Cambridge',
            country: 'USA',
            status: 'ACTIVE',
            featured: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: '2',
            name: 'MIT',
            slug: 'mit',
            description: 'Leading technology institute',
            city: 'Cambridge',
            country: 'USA',
            status: 'ACTIVE',
            featured: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ]
        this.saveToFile()
      }
    } catch (error) {
      console.error('❌ Error loading from file:', error)
    }
  }

  private saveToFile() {
    try {
      const fs = require('fs')
      fs.writeFileSync(this.dataFile, JSON.stringify(this.data, null, 2))
      console.log('💾 Saved data to file:', this.dataFile)
    } catch (error) {
      console.error('❌ Error saving to file:', error)
    }
  }
  
  static getInstance(): FallbackStorage {
    if (!FallbackStorage.instance) {
      FallbackStorage.instance = new FallbackStorage()
    }
    return FallbackStorage.instance
  }
  
  // College operations
  async getColleges(): Promise<College[]> {
    return this.data.colleges
  }
  
  async getCollegeById(id: string): Promise<College | null> {
    return this.data.colleges.find(c => c.id === id) || null
  }
  
  async createCollege(college: any): Promise<College> {
    const newCollege: College = {
      id: college.id || Date.now().toString(),
      name: college.name,
      slug: college.slug,
      description: college.description,
      city: college.location?.split(',')[0] || college.city,
      country: college.country,
      status: 'ACTIVE',
      featured: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    this.data.colleges.push(newCollege)
    this.saveToFile()  // Save to file immediately
    console.log('📝 Stored college in local file:', newCollege)
    return newCollege
  }
  
  async updateCollege(id: string, updates: Partial<College>): Promise<College | null> {
    const index = this.data.colleges.findIndex(c => c.id === id)
    if (index === -1) return null
    
    this.data.colleges[index] = {
      ...this.data.colleges[index],
      ...updates,
      updatedAt: new Date().toISOString()
    }
    this.saveToFile()  // Save to file immediately
    return this.data.colleges[index]
  }
  
  async deleteCollege(id: string): Promise<boolean> {
    const index = this.data.colleges.findIndex(c => c.id === id)
    if (index === -1) return false
    
    this.data.colleges.splice(index, 1)
    this.saveToFile()  // Save to file immediately
    return true
  }
  
  // Stats
  async getStats() {
    return {
      totalColleges: this.data.colleges.length,
      totalCourses: this.data.courses.length,
      totalSpecializations: this.data.specializations.length,
      totalLeads: this.data.leads.length,
      todaysLeads: 0,
      weeklyLeads: 0
    }
  }
}

export const fallbackStorage = FallbackStorage.getInstance()