'use client'

import { useState } from 'react'
import { 
  Upload, 
  Download, 
  FileSpreadsheet, 
  AlertCircle, 
  CheckCircle2, 
  X,
  Database,
  FileText,
  BookOpen,
  Users,
  Layers,
  Info,
  ChevronRight,
  FileDown
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function BulkImportPage() {
  const [selectedEntity, setSelectedEntity] = useState<string>('colleges')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadResult, setUploadResult] = useState<any>(null)
  const [dragActive, setDragActive] = useState(false)

  const entities = [
    { 
      value: 'colleges', 
      label: 'Colleges', 
      description: 'Import educational institutions',
      icon: BookOpen,
      color: '#667eea',
      stats: { current: 14, estimated: '+50' }
    },
    { 
      value: 'courses', 
      label: 'Courses', 
      description: 'Import courses offered by colleges',
      icon: Layers,
      color: '#10b981',
      stats: { current: 10, estimated: '+100' }
    },
    { 
      value: 'specializations', 
      label: 'Specializations', 
      description: 'Import course specializations',
      icon: Database,
      color: '#f59e0b',
      stats: { current: 33, estimated: '+200' }
    },
    { 
      value: 'leads', 
      label: 'Leads', 
      description: 'Import student inquiries',
      icon: Users,
      color: '#ef4444',
      stats: { current: 54, estimated: '+500' }
    }
  ]

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0])
    }
  }

  const handleFileSelect = (file: File) => {
    const allowedTypes = ['text/csv', 'application/json', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
    const fileExtension = file.name.split('.').pop()?.toLowerCase()
    
    if (allowedTypes.includes(file.type) || ['csv', 'json'].includes(fileExtension || '')) {
      setSelectedFile(file)
      setUploadResult(null)
    } else {
      alert('Please upload a CSV or JSON file')
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!selectedFile || !selectedEntity) return

    setIsUploading(true)
    setUploadResult(null)

    try {
      const formData = new FormData()
      formData.append('file', selectedFile)
      formData.append('entityType', selectedEntity)

      const response = await fetch('/api/admin/bulk-import', {
        method: 'POST',
        body: formData
      })

      const result = await response.json()
      
      if (response.ok) {
        setUploadResult({
          success: true,
          ...result
        })
        setSelectedFile(null)
      } else {
        setUploadResult({
          success: false,
          error: result.error || 'Upload failed',
          details: result.details
        })
      }
    } catch (error: any) {
      setUploadResult({
        success: false,
        error: 'Network error occurred',
        details: error.message
      })
    } finally {
      setIsUploading(false)
    }
  }

  const downloadTemplate = (entityType: string) => {
    window.location.href = `/api/admin/bulk-import?template=${entityType}`
  }

  const selectedEntityData = entities.find(e => e.value === selectedEntity)

  return (
    <div style={{
      padding: '32px',
      maxWidth: '100%',
      minHeight: '100vh',
      background: '#f9fafb'
    }}>
      
      {/* Header Section */}
      <div style={{
        marginBottom: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
          }}>
            <Upload style={{ width: '28px', height: '28px', color: 'white' }} />
          </div>
          <div>
            <h1 style={{
              fontSize: '32px',
              fontWeight: '700',
              color: '#111827',
              margin: 0,
              letterSpacing: '-0.5px'
            }}>
              Bulk Import Data
            </h1>
            <p style={{
              fontSize: '16px',
              color: '#6b7280',
              margin: '4px 0 0 0'
            }}>
              Import multiple records at once using CSV or JSON files
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '32px'
      }}>
        {entities.map(entity => {
          const Icon = entity.icon
          const isSelected = selectedEntity === entity.value
          
          return (
            <div
              key={entity.value}
              onClick={() => setSelectedEntity(entity.value)}
              style={{
                padding: '24px',
                borderRadius: '12px',
                background: isSelected ? 'white' : 'white',
                border: isSelected ? `2px solid ${entity.color}` : '1px solid #e5e7eb',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: isSelected ? '0 10px 25px -5px rgba(0, 0, 0, 0.1)' : '0 1px 3px rgba(0, 0, 0, 0.1)'
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)'
                }
              }}
            >
              {isSelected && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: entity.color
                }} />
              )}
              
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '10px',
                  background: `${entity.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Icon style={{ width: '24px', height: '24px', color: entity.color }} />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#111827',
                    margin: '0 0 4px 0'
                  }}>
                    {entity.label}
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: '#6b7280',
                    margin: '0 0 8px 0'
                  }}>
                    {entity.description}
                  </p>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontSize: '13px',
                    color: '#6b7280'
                  }}>
                    <span>Current: <strong style={{ color: '#111827' }}>{entity.stats.current}</strong></span>
                    <span style={{ color: entity.color, fontWeight: '600' }}>{entity.stats.estimated}</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <Tabs defaultValue="import" style={{ marginTop: '32px' }}>
        <TabsList style={{
          background: 'white',
          padding: '4px',
          borderRadius: '12px',
          border: '1px solid #e5e7eb',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
          marginBottom: '24px'
        }}>
          <TabsTrigger value="import" style={{ borderRadius: '8px', padding: '8px 16px' }}>
            <Upload style={{ width: '16px', height: '16px', marginRight: '8px' }} />
            Import Data
          </TabsTrigger>
          <TabsTrigger value="templates" style={{ borderRadius: '8px', padding: '8px 16px' }}>
            <Download style={{ width: '16px', height: '16px', marginRight: '8px' }} />
            Download Templates
          </TabsTrigger>
          <TabsTrigger value="instructions" style={{ borderRadius: '8px', padding: '8px 16px' }}>
            <Info style={{ width: '16px', height: '16px', marginRight: '8px' }} />
            Instructions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="import" style={{ marginTop: '24px' }}>
          <Card style={{
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
            background: 'white'
          }}>
            <CardHeader style={{ borderBottom: '1px solid #f3f4f6', padding: '24px' }}>
              <CardTitle style={{ fontSize: '20px', fontWeight: '600', color: '#111827' }}>
                Upload {selectedEntityData?.label} File
              </CardTitle>
              <CardDescription style={{ color: '#6b7280', marginTop: '8px' }}>
                Drag and drop or click to select a CSV or JSON file
              </CardDescription>
            </CardHeader>
            <CardContent style={{ padding: '24px' }}>
              <div
                style={{
                  border: `2px dashed ${dragActive ? selectedEntityData?.color : '#e5e7eb'}`,
                  borderRadius: '12px',
                  padding: '48px 24px',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  background: dragActive ? `${selectedEntityData?.color}05` : (selectedFile ? '#f0fdf4' : '#fafafa'),
                  cursor: 'pointer'
                }}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => !selectedFile && document.getElementById('file-upload')?.click()}
              >
                <input
                  type="file"
                  id="file-upload"
                  accept=".csv,.json"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
                
                {selectedFile ? (
                  <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    gap: '16px'
                  }}>
                    <div style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      background: '#10b98115',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <FileSpreadsheet style={{ width: '40px', height: '40px', color: '#10b981' }} />
                    </div>
                    <div>
                      <p style={{
                        fontSize: '18px',
                        fontWeight: '600',
                        color: '#111827',
                        margin: '0 0 8px 0'
                      }}>
                        {selectedFile.name}
                      </p>
                      <p style={{
                        fontSize: '14px',
                        color: '#6b7280'
                      }}>
                        Size: {(selectedFile.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedFile(null)
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        border: '1px solid #e5e7eb',
                        background: 'white',
                        color: '#ef4444',
                        fontSize: '14px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#fef2f2'
                        e.currentTarget.style.borderColor = '#fecaca'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'white'
                        e.currentTarget.style.borderColor = '#e5e7eb'
                      }}
                    >
                      <X style={{ width: '16px', height: '16px' }} />
                      Remove File
                    </button>
                  </div>
                ) : (
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '16px'
                  }}>
                    <div style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      background: `${selectedEntityData?.color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Upload style={{ width: '40px', height: '40px', color: selectedEntityData?.color }} />
                    </div>
                    <div>
                      <p style={{
                        fontSize: '16px',
                        color: '#111827',
                        margin: '0 0 4px 0'
                      }}>
                        <span style={{ color: selectedEntityData?.color, fontWeight: '600' }}>Click to upload</span>
                        {' '}or drag and drop
                      </p>
                      <p style={{
                        fontSize: '14px',
                        color: '#6b7280'
                      }}>
                        CSV or JSON files (max. 10MB)
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {selectedFile && (
                <button
                  onClick={handleUpload}
                  disabled={isUploading}
                  style={{
                    width: '100%',
                    marginTop: '24px',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    background: isUploading ? '#e5e7eb' : `linear-gradient(135deg, ${selectedEntityData?.color} 0%, ${selectedEntityData?.color}dd 100%)`,
                    color: 'white',
                    fontSize: '15px',
                    fontWeight: '600',
                    border: 'none',
                    cursor: isUploading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: isUploading ? 'none' : `0 4px 12px ${selectedEntityData?.color}30`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                  onMouseEnter={(e) => !isUploading && (e.currentTarget.style.transform = 'translateY(-1px)')}
                  onMouseLeave={(e) => !isUploading && (e.currentTarget.style.transform = 'translateY(0)')}
                >
                  {isUploading ? (
                    <>Processing...</>
                  ) : (
                    <>
                      <Upload style={{ width: '18px', height: '18px' }} />
                      Import {selectedEntityData?.label}
                    </>
                  )}
                </button>
              )}
            </CardContent>
          </Card>

          {uploadResult && (
            <Card style={{
              marginTop: '24px',
              border: uploadResult.success ? '2px solid #10b981' : '2px solid #ef4444',
              borderRadius: '12px',
              background: uploadResult.success ? '#f0fdf4' : '#fef2f2'
            }}>
              <CardHeader style={{ padding: '20px 24px' }}>
                <CardTitle style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px',
                  fontSize: '18px',
                  fontWeight: '600',
                  color: uploadResult.success ? '#10b981' : '#ef4444'
                }}>
                  {uploadResult.success ? (
                    <>
                      <CheckCircle2 style={{ width: '24px', height: '24px' }} />
                      Import Successful
                    </>
                  ) : (
                    <>
                      <AlertCircle style={{ width: '24px', height: '24px' }} />
                      Import Failed
                    </>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent style={{ padding: '0 24px 20px' }}>
                {uploadResult.success ? (
                  <div>
                    <p style={{ 
                      fontSize: '15px',
                      color: '#065f46',
                      marginBottom: '16px'
                    }}>
                      {uploadResult.message}
                    </p>
                    {uploadResult.details && (
                      <div style={{
                        background: 'white',
                        borderRadius: '8px',
                        padding: '16px',
                        border: '1px solid #d1fae5'
                      }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                          <div>
                            <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Total Records</p>
                            <p style={{ fontSize: '24px', fontWeight: '700', color: '#111827' }}>{uploadResult.details.total}</p>
                          </div>
                          <div>
                            <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Successful</p>
                            <p style={{ fontSize: '24px', fontWeight: '700', color: '#10b981' }}>{uploadResult.details.successful}</p>
                          </div>
                          {uploadResult.details.failed > 0 && (
                            <div>
                              <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Failed</p>
                              <p style={{ fontSize: '24px', fontWeight: '700', color: '#ef4444' }}>{uploadResult.details.failed}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <p style={{
                      fontSize: '15px',
                      color: '#991b1b',
                      marginBottom: uploadResult.details ? '16px' : 0
                    }}>
                      {uploadResult.error}
                    </p>
                    {uploadResult.details && (
                      <div style={{
                        background: 'white',
                        borderRadius: '8px',
                        padding: '12px 16px',
                        border: '1px solid #fecaca'
                      }}>
                        <p style={{ fontSize: '14px', color: '#ef4444', fontFamily: 'monospace' }}>
                          {uploadResult.details}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="templates" style={{ marginTop: '24px' }}>
          <Card style={{
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
            background: 'white'
          }}>
            <CardHeader style={{ borderBottom: '1px solid #f3f4f6', padding: '24px' }}>
              <CardTitle style={{ fontSize: '20px', fontWeight: '600', color: '#111827' }}>
                Download Sample Templates
              </CardTitle>
              <CardDescription style={{ color: '#6b7280', marginTop: '8px' }}>
                Use these templates as a starting point for your data import
              </CardDescription>
            </CardHeader>
            <CardContent style={{ padding: '24px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                {entities.map(entity => {
                  const Icon = entity.icon
                  return (
                    <div
                      key={entity.value}
                      style={{
                        padding: '20px',
                        borderRadius: '10px',
                        border: '1px solid #e5e7eb',
                        background: 'white',
                        transition: 'all 0.2s ease',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)'
                        e.currentTarget.style.transform = 'translateY(-2px)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = 'none'
                        e.currentTarget.style.transform = 'translateY(0)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '8px',
                            background: `${entity.color}15`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <Icon style={{ width: '20px', height: '20px', color: entity.color }} />
                          </div>
                          <div>
                            <h3 style={{
                              fontSize: '16px',
                              fontWeight: '600',
                              color: '#111827',
                              margin: '0 0 4px 0'
                            }}>
                              {entity.label}
                            </h3>
                            <p style={{
                              fontSize: '13px',
                              color: '#6b7280',
                              margin: 0
                            }}>
                              CSV Template
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => downloadTemplate(entity.value)}
                          style={{
                            padding: '8px',
                            borderRadius: '8px',
                            border: 'none',
                            background: `${entity.color}15`,
                            color: entity.color,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = entity.color
                            e.currentTarget.style.color = 'white'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = `${entity.color}15`
                            e.currentTarget.style.color = entity.color
                          }}
                        >
                          <FileDown style={{ width: '18px', height: '18px' }} />
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="instructions" style={{ marginTop: '24px' }}>
          <Card style={{
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
            background: 'white'
          }}>
            <CardHeader style={{ borderBottom: '1px solid #f3f4f6', padding: '24px' }}>
              <CardTitle style={{ fontSize: '20px', fontWeight: '600', color: '#111827' }}>
                How to Use Bulk Import
              </CardTitle>
            </CardHeader>
            <CardContent style={{ padding: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {[
                  {
                    step: '1',
                    title: 'Download Template',
                    description: 'Download the CSV template for the type of data you want to import. The template includes all required and optional fields with sample data.',
                    color: '#667eea'
                  },
                  {
                    step: '2',
                    title: 'Prepare Your Data',
                    description: 'Fill in your data following the template format. Required fields must be filled, use exact column names, and follow the specified formats.',
                    color: '#10b981'
                  },
                  {
                    step: '3',
                    title: 'Upload and Import',
                    description: 'Select the entity type, upload your prepared file, and click Import. The system will validate and import your data, showing you the results.',
                    color: '#f59e0b'
                  }
                ].map(item => (
                  <div
                    key={item.step}
                    style={{
                      display: 'flex',
                      gap: '20px',
                      padding: '20px',
                      borderRadius: '10px',
                      background: '#f9fafb',
                      border: '1px solid #e5e7eb'
                    }}
                  >
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      background: item.color,
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px',
                      fontWeight: '700',
                      flexShrink: 0
                    }}>
                      {item.step}
                    </div>
                    <div>
                      <h3 style={{
                        fontSize: '18px',
                        fontWeight: '600',
                        color: '#111827',
                        margin: '0 0 8px 0'
                      }}>
                        Step {item.step}: {item.title}
                      </h3>
                      <p style={{
                        fontSize: '15px',
                        color: '#6b7280',
                        margin: 0,
                        lineHeight: '1.6'
                      }}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{
                marginTop: '32px',
                padding: '20px',
                borderRadius: '10px',
                background: '#fef3c7',
                border: '1px solid #fde68a'
              }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <AlertCircle style={{
                    width: '24px',
                    height: '24px',
                    color: '#f59e0b',
                    flexShrink: 0,
                    marginTop: '2px'
                  }} />
                  <div>
                    <h4 style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#92400e',
                      margin: '0 0 12px 0'
                    }}>
                      Important Notes
                    </h4>
                    <ul style={{
                      fontSize: '14px',
                      color: '#78350f',
                      margin: 0,
                      paddingLeft: '20px',
                      lineHeight: '1.8'
                    }}>
                      <li>Maximum file size: 10MB</li>
                      <li>Supported formats: CSV and JSON</li>
                      <li>Duplicate records will be skipped based on unique fields</li>
                      <li>For courses, specify the college name or ID</li>
                      <li>For specializations, specify the course name or ID</li>
                      <li>Use comma-separated values for array fields</li>
                      <li>Dates should be in YYYY-MM-DD format</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}