import { NextResponse } from 'next/server'
import Calculator from '../../../../src/calculations/calculator'
import type { IRequest } from '../../../../src/calculations/interfaces/request'
import type { IVariable } from '../../../../src/calculations/interfaces/variable'
import type { IConstant } from '../../../../src/calculations/interfaces/constant'
import type { TCustomSpaceConstants } from '../../../../src/calculations/types/custom_space_constant'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  try {
    const body: IRequest = await req.json()
    const version = '1'
    const variables: IVariable = body.variables
    const customSpaceConstants: TCustomSpaceConstants | undefined = body.customSpaceConstants
    const customConstants: IConstant | undefined = body.customConstants
    
    // Debug: Check if config file exists
    try {
      // In Vercel, the function cwd will be the "frontend" directory.
      // Our configs live one level up in ../src/config/versions/<version>/default.json
      const configPath = join(process.cwd(), '..', 'src', 'config', 'versions', version, 'default.json')
      console.log('Config path:', configPath)
      const configExists = existsSync(configPath)
      console.log('Config exists:', configExists)
      if (configExists) {
        const configContent = readFileSync(configPath, 'utf-8')
        console.log('Config size:', configContent.length)
      }
    } catch (debugErr) {
      console.log('Debug error:', debugErr)
    }
    
    const calculator = new Calculator(variables, customSpaceConstants, customConstants, version)
    const result = calculator.result()
    return NextResponse.json({ ...result, version })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('Calculation error:', err)
    return NextResponse.json({ error: 'Calculation failed', message }, { status: 400 })
  }
}

