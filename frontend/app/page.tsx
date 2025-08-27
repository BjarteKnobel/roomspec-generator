"use client"
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Users, Settings, TrendingUp, Calculator, Layout } from 'lucide-react'

interface IVariable {
  accessToCanteen: boolean
  accessToAuditorium: boolean
  seatsInAuditorium: number
  shareOfEmployeesInAuditorium: number
  accessToCourseSpace: boolean
  accessToGym: boolean
  accessToCellOffice: boolean
  accessToCoworking: boolean
  accessToReception: boolean
  specialAreaOffice: number
  specialAreaShared: number
  specialAreaCommon: number
  accessToExercise: boolean
  coworkingShare: number
  touchdownShare: number
  dockinShare: number
  cellOfficeShare: number
  landscapeShare: number
  numberOfEmployees: number
  concurrencyAttendanceShare: number
  peakConcurrencyAttendanceShare: number
  overCapacityShare: number
  homeOfficeAverageShare: number
  projectroomShare: number
  focusroomShare: number
  quietzoneShare: number
  miniMeetingroomShare: number
  smallMeetingroomShare: number
  mediumMeetingroomShare: number
  largeMeetingroomShare: number
}

interface IConstant {
  governmentMinimumSquaremetersPerWorkSpace: number
  corridorAddonShare: number
  innerwallsAddonShare: number
}

interface ISpaceResult {
  netArea?: number
  numberOfSeats?: number
  numberOfRooms?: number
  adjustedAreaInclCompensation?: number
}

interface ISpace {
  name: string
  result: ISpaceResult
  spaces?: ISpace[]
}

interface ICalculationResult {
  totals?: {
    grossArea?: number
    netArea?: number
    dimensionedAttendance?: number
    grossAreaPerEmployee?: number
  }
  spaces?: ISpace[]
}

export default function OfficeDesignApp() {
  const [variables, setVariables] = useState<IVariable>({
    accessToCanteen: true,
    accessToAuditorium: true,
    seatsInAuditorium: 120,
    shareOfEmployeesInAuditorium: 0.8,
    accessToCourseSpace: true,
    accessToGym: true,
    accessToCellOffice: true,
    accessToCoworking: true,
    accessToReception: true,
    specialAreaOffice: 150,
    specialAreaShared: 200,
    specialAreaCommon: 300,
    accessToExercise: true,
    coworkingShare: 0.45,
    touchdownShare: 0.25,
    dockinShare: 0.15,
    cellOfficeShare: 0.15,
    landscapeShare: 0.0,
    numberOfEmployees: 180,
    concurrencyAttendanceShare: 0.75,
    peakConcurrencyAttendanceShare: 0.85,
    overCapacityShare: 0.1,
    homeOfficeAverageShare: 0.3,
    projectroomShare: 0.08,
    focusroomShare: 0.12,
    quietzoneShare: 0.06,
    miniMeetingroomShare: 0.15,
    smallMeetingroomShare: 0.12,
    mediumMeetingroomShare: 0.08,
    largeMeetingroomShare: 0.04,
  })

  const [constants, setConstants] = useState<IConstant>({
    governmentMinimumSquaremetersPerWorkSpace: 12,
    corridorAddonShare: 0.18,
    innerwallsAddonShare: 0.12,
  })

  const [results, setResults] = useState<ICalculationResult>({
    totals: {
      workplaceArea: 3240.8,
      netArea: 4512.6,
      grossArea: 5867.4,
      dimensionedAttendance: 135,
      grossAreaPerEmployee: 43.5,
      netAreaPerEmployee: 33.4,
    },
    spaces: [
      { name: 'Coworking Areas', result: { numberOfSeats: 61, netArea: 1220.5, adjustedAreaInclCompensation: 1342.6 }},
    ],
  })

  const [isCalculating, setIsCalculating] = useState(false)
  const [isLive, setIsLive] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string|null>(null)

  const handleVariableChange = (key: keyof IVariable, value: boolean | number) => {
    setVariables((prev) => ({ ...prev, [key]: value }))
  }
  const handleConstantChange = (key: keyof IConstant, value: number) => {
    setConstants((prev) => ({ ...prev, [key]: value }))
  }

  const handleCalculate = async () => {
    setIsCalculating(true)
    try {
      const payload = { variables, customConstants: constants }
      const res = await fetch('/api/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      let data: ICalculationResult | null = null
      try {
        data = await res.json()
      } catch {
        data = null
      }
      if (res.ok && data) {
        setResults(data)
        setIsLive(true)
        setErrorMsg(null)
      } else {
        setIsLive(false)
        const errorData = data as unknown as { error?: string; message?: string }
        setErrorMsg((errorData && (errorData.error || errorData.message)) || 'Calculation failed')
      }
    } finally {
      setIsCalculating(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-primary/10 rounded-lg border border-primary/20">
                <Calculator className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-foreground">Office Space Calculator</h1>
                <p className="text-sm text-muted-foreground">Professional workspace planning tool</p>
              </div>
            </div>
            <Badge variant={isLive ? 'secondary' : 'outline'} className="text-xs">{isLive ? 'Live' : 'Demo Mode'}</Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6">
        <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-140px)]">
          <Card className="flex flex-col">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-lg">
                <Settings className="h-5 w-5 text-primary" />
                Input Parameters
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <ScrollArea className="h-full pr-4">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 pb-2">
                      <Users className="h-4 w-4 text-gray-600" />
                      <h3 className="font-medium text-gray-700">Company Metrics</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="numberOfEmployees" className="text-sm">Total Employees</Label>
                        <Input id="numberOfEmployees" type="number" value={variables.numberOfEmployees} onChange={(e) => handleVariableChange('numberOfEmployees', Number.parseInt(e.target.value) || 0)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="concurrencyAttendanceShare" className="text-sm">Attendance Rate</Label>
                        <Input id="concurrencyAttendanceShare" type="number" step="0.01" min="0" max="1" value={variables.concurrencyAttendanceShare} onChange={(e) => handleVariableChange('concurrencyAttendanceShare', Number.parseFloat(e.target.value) || 0)} />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <Button onClick={handleCalculate} className="w-full text-white" disabled={isCalculating}>
                      {isCalculating ? 'Calculating...' : 'Calculate Space Requirements'}
                    </Button>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-700">Facility Access</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { key: 'accessToCanteen', label: 'Canteen' },
                        { key: 'accessToAuditorium', label: 'Auditorium' },
                        { key: 'accessToCourseSpace', label: 'Training Space' },
                        { key: 'accessToGym', label: 'Gym' },
                        { key: 'accessToCellOffice', label: 'Private Offices' },
                        { key: 'accessToCoworking', label: 'Coworking' },
                        { key: 'accessToReception', label: 'Reception' },
                        { key: 'accessToExercise', label: 'Exercise Area' },
                      ].map(({ key, label }) => (
                        <div key={key} className="flex items-center space-x-2 p-2 rounded-md bg-muted/50">
                          <Checkbox id={key} checked={variables[key as keyof IVariable] as boolean} onCheckedChange={(checked) => handleVariableChange(key as keyof IVariable, checked as boolean)} />
                          <Label htmlFor={key} className="text-sm">{label}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-700">Workspace Distribution</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { key: 'coworkingShare', label: 'Open Workspace' },
                        { key: 'touchdownShare', label: 'Touchdown' },
                        { key: 'dockinShare', label: 'Hot Desking' },
                        { key: 'cellOfficeShare', label: 'Private Offices' },
                        { key: 'landscapeShare', label: 'Landscape' },
                        { key: 'homeOfficeAverageShare', label: 'Remote Work' },
                      ].map(({ key, label }) => (
                        <div key={key} className="space-y-1">
                          <Label htmlFor={key} className="text-sm text-muted-foreground">{label}</Label>
                          <Input id={key} type="number" step="0.01" min="0" max="1" className="h-9" value={variables[key as keyof IVariable] as number} onChange={(e) => handleVariableChange(key as keyof IVariable, Number.parseFloat(e.target.value) || 0)} />
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-700">Meeting Spaces</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { key: 'projectroomShare', label: 'Project Rooms' },
                        { key: 'focusroomShare', label: 'Focus Rooms' },
                        { key: 'quietzoneShare', label: 'Quiet Zones' },
                        { key: 'miniMeetingroomShare', label: 'Mini Meeting' },
                        { key: 'smallMeetingroomShare', label: 'Small Meeting' },
                        { key: 'mediumMeetingroomShare', label: 'Medium Meeting' },
                        { key: 'largeMeetingroomShare', label: 'Large Meeting' },
                      ].map(({ key, label }) => (
                        <div key={key} className="space-y-1">
                          <Label htmlFor={key} className="text-xs text-muted-foreground">{label}</Label>
                          <Input id={key} type="number" step="0.01" min="0" max="1" className="h-8 text-sm" value={variables[key as keyof IVariable] as number} onChange={(e) => handleVariableChange(key as keyof IVariable, Number.parseFloat(e.target.value) || 0)} />
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-700">System Constants</h3>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <Label htmlFor="governmentMinimum" className="text-sm text-muted-foreground">Min. Area per Workspace (m²)</Label>
                        <Input id="governmentMinimum" type="number" className="h-9" value={constants.governmentMinimumSquaremetersPerWorkSpace} onChange={(e) => handleConstantChange('governmentMinimumSquaremetersPerWorkSpace', Number.parseFloat(e.target.value) || 0)} />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="corridorAddon" className="text-sm text-muted-foreground">Corridor Addition</Label>
                        <Input id="corridorAddon" type="number" step="0.01" className="h-9" value={constants.corridorAddonShare} onChange={(e) => handleConstantChange('corridorAddonShare', Number.parseFloat(e.target.value) || 0)} />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="innerwallsAddon" className="text-sm text-muted-foreground">Walls Addition</Label>
                        <Input id="innerwallsAddon" type="number" step="0.01" className="h-9" value={constants.innerwallsAddonShare} onChange={(e) => handleConstantChange('innerwallsAddonShare', Number.parseFloat(e.target.value) || 0)} />
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          <Card className="flex flex-col">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-lg">
                <Layout className="h-5 w-5 text-chart-2" />
                Visual Layout
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="h-full flex flex-col">
                <div className="flex-1 bg-muted/20 rounded-lg border-2 border-dashed border-muted-foreground/20 p-4 mb-4">
                  <div className="h-full relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                      <svg width="100%" height="100%" className="text-muted-foreground">
                        <defs>
                          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="1" />
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                      </svg>
                    </div>

                    <div className="relative h-full grid grid-cols-4 grid-rows-4 gap-2 p-2">
                      {(() => {
                        // For main areas, use the top-level area calculations
                        const workArea = results.spaces?.find((s: ISpace) => s.name?.includes('work related'))?.result?.netArea || 0
                        const sharedArea = results.spaces?.find((s: ISpace) => s.name?.includes('shared'))?.result?.netArea || 0
                        const commonArea = results.spaces?.find((s: ISpace) => s.name?.includes('common'))?.result?.netArea || 0
                        
                        return (
                          <>
                            <div className="col-span-2 row-span-2 bg-primary/20 border border-primary/40 rounded-md p-2 flex flex-col justify-center items-center">
                              <div className="text-xs font-medium text-primary">Coworking</div>
                              <div className="text-xs text-muted-foreground">
                                {Math.round(variables.numberOfEmployees * variables.coworkingShare * variables.concurrencyAttendanceShare)} seats
                              </div>
                              <div className="text-xs text-muted-foreground">{Math.round(workArea * variables.coworkingShare)}m²</div>
                            </div>

                            <div className="bg-accent/20 border border-accent/40 rounded-md p-1 flex flex-col justify-center items-center">
                              <div className="text-xs font-medium text-accent">Small</div>
                              <div className="text-xs text-muted-foreground">Meeting</div>
                              <div className="text-xs text-muted-foreground">{Math.round(sharedArea * variables.smallMeetingroomShare)}m²</div>
                            </div>
                            <div className="bg-accent/20 border border-accent/40 rounded-md p-1 flex flex-col justify-center items-center">
                              <div className="text-xs font-medium text-accent">Medium</div>
                              <div className="text-xs text-muted-foreground">Meeting</div>
                              <div className="text-xs text-muted-foreground">{Math.round(sharedArea * variables.mediumMeetingroomShare)}m²</div>
                            </div>

                            <div className="bg-chart-3/20 border border-chart-3/40 rounded-md p-1 flex flex-col justify-center items-center">
                              <div className="text-xs font-medium text-chart-3">Focus</div>
                              <div className="text-xs text-muted-foreground">Room</div>
                              <div className="text-xs text-muted-foreground">{Math.round(workArea * variables.focusroomShare)}m²</div>
                            </div>
                            <div className="bg-chart-3/20 border border-chart-3/40 rounded-md p-1 flex flex-col justify-center items-center">
                              <div className="text-xs font-medium text-chart-3">Project</div>
                              <div className="text-xs text-muted-foreground">Room</div>
                              <div className="text-xs text-muted-foreground">{Math.round(workArea * variables.projectroomShare)}m²</div>
                            </div>

                            <div className="col-span-2 bg-chart-1/20 border border-chart-1/40 rounded-md p-2 flex flex-col justify-center items-center">
                              <div className="text-xs font-medium text-chart-1">Private Offices</div>
                              <div className="text-xs text-muted-foreground">{Math.round(variables.numberOfEmployees * variables.cellOfficeShare * 0.5)} rooms</div>
                              <div className="text-xs text-muted-foreground">{Math.round(workArea * variables.cellOfficeShare)}m²</div>
                            </div>

                            <div className="bg-chart-4/20 border border-chart-4/40 rounded-md p-1 flex flex-col justify-center items-center">
                              <div className="text-xs font-medium text-chart-4">Touch</div>
                              <div className="text-xs text-muted-foreground">Down</div>
                              <div className="text-xs text-muted-foreground">{Math.round(workArea * variables.touchdownShare)}m²</div>
                            </div>
                            <div className="bg-chart-4/20 border border-chart-4/40 rounded-md p-1 flex flex-col justify-center items-center">
                              <div className="text-xs font-medium text-chart-4">Quiet</div>
                              <div className="text-xs text-muted-foreground">Zone</div>
                              <div className="text-xs text-muted-foreground">{Math.round(workArea * variables.quietzoneShare)}m²</div>
                            </div>

                            {variables.accessToReception && (
                              <div className="col-span-2 bg-chart-5/20 border border-chart-5/40 rounded-md p-2 flex flex-col justify-center items-center">
                                <div className="text-xs font-medium text-chart-5">Reception Area</div>
                                <div className="text-xs text-muted-foreground">Welcome space</div>
                                <div className="text-xs text-muted-foreground">{Math.round(commonArea * 0.1)}m²</div>
                              </div>
                            )}

                            {variables.accessToCanteen && (
                              <div className="bg-orange-500/20 border border-orange-500/40 rounded-md p-1 flex flex-col justify-center items-center">
                                <div className="text-xs font-medium text-orange-600">Canteen</div>
                              </div>
                            )}
                            {variables.accessToGym && (
                              <div className="bg-green-500/20 border border-green-500/40 rounded-md p-1 flex flex-col justify-center items-center">
                                <div className="text-xs font-medium text-green-600">Gym</div>
                              </div>
                            )}
                          </>
                        )
                      })()}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-700">Space Types</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-2"><div className="w-3 h-3 bg-primary/40 rounded" /> <span>Open Workspace</span></div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 bg-accent/40 rounded" /> <span>Meeting Rooms</span></div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 bg-chart-1/40 rounded" /> <span>Private Offices</span></div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 bg-chart-3/40 rounded" /> <span>Focus Areas</span></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="flex flex-col">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-lg">
                <TrendingUp className="h-5 w-5 text-accent" />
                Results
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              {errorMsg && (
                <div className="mb-3 text-sm text-red-600">{errorMsg}</div>
              )}
              <ScrollArea className="h-full pr-4">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-700">Summary</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <Card className="p-4">
                        <div className="text-2xl font-bold text-primary">{(results.totals?.grossArea ?? 0).toFixed?.(0) ?? results.totals?.grossArea}</div>
                        <div className="text-sm text-muted-foreground">Gross Area (m²)</div>
                        <div className="text-xs text-muted-foreground mt-1">Including corridors & walls</div>
                      </Card>
                      <Card className="p-4">
                        <div className="text-2xl font-bold text-accent">{(results.totals?.netArea ?? 0).toFixed?.(0) ?? results.totals?.netArea}</div>
                        <div className="text-sm text-muted-foreground">Net Area (m²)</div>
                        <div className="text-xs text-muted-foreground mt-1">Functional workspace</div>
                      </Card>
                      <Card className="p-4">
                        <div className="text-2xl font-bold text-chart-3">{Math.round(results.totals?.dimensionedAttendance ?? 0) || '-'}</div>
                        <div className="text-sm text-muted-foreground">Peak Occupancy</div>
                        <div className="text-xs text-muted-foreground mt-1">Concurrent users</div>
                      </Card>
                      <Card className="p-4">
                        <div className="text-2xl font-bold text-chart-4">{(results.totals?.grossAreaPerEmployee ?? 0).toFixed?.(1) ?? results.totals?.grossAreaPerEmployee}</div>
                        <div className="text-sm text-muted-foreground">m² per Employee</div>
                        <div className="text-xs text-muted-foreground mt-1">Industry: 40-50m²</div>
                      </Card>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-700">Space Allocation</h3>
                    <div className="space-y-3">
                      {(results.spaces ?? []).map((space: ISpace, index: number) => (
                        <Card key={index} className="p-4 hover:bg-muted/50 transition-colors">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium text-gray-700">{space.name}</h4>
                            <Badge variant="outline" className="text-xs">{space.result?.netArea?.toFixed?.(0) ?? space.result?.netArea}m²</Badge>
                          </div>
                          <div className="grid grid-cols-3 gap-3 text-sm">
                            {space.result?.numberOfSeats && (
                              <div className="text-center p-2 bg-chart-3/10 rounded">
                                <div className="text-lg font-semibold text-chart-3">{space.result.numberOfSeats}</div>
                                <div className="text-xs text-muted-foreground">Seats</div>
                              </div>
                            )}
                            {space.result?.numberOfRooms && (
                              <div className="text-center p-2 bg-chart-1/10 rounded">
                                <div className="text-lg font-semibold text-chart-1">{space.result.numberOfRooms}</div>
                                <div className="text-xs text-muted-foreground">Rooms</div>
                              </div>
                            )}
                            <div className="text-center p-2 bg-accent/10 rounded">
                              <div className="text-lg font-semibold text-accent">{space.result?.adjustedAreaInclCompensation?.toFixed?.(0) ?? space.result?.adjustedAreaInclCompensation}</div>
                              <div className="text-xs text-muted-foreground">Total m²</div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

