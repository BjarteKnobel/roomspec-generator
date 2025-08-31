import { NextResponse } from 'next/server'
import Calculator from '../../../../src/calculations/calculator'
import type { IRequest } from '../../../../src/calculations/interfaces/request'
import type { IVariable } from '../../../../src/calculations/interfaces/variable'
import type { IConstant } from '../../../../src/calculations/interfaces/constant'
import type { TCustomSpaceConstants } from '../../../../src/calculations/types/custom_space_constant'
import configV1 from '../../../../src/config/versions/1/default.json' assert { type: 'json' }
import type { IConfig } from '../../../../src/calculations/interfaces/config'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  try {
    const body: IRequest = await req.json()
    const version = '1'
    const variables: IVariable = body.variables
    const customSpaceConstants: TCustomSpaceConstants | undefined = body.customSpaceConstants
    const customConstants: IConstant | undefined = body.customConstants
    
    const configOverride = configV1 as unknown as IConfig
    console.log('Config spaces count:', configOverride.spaces?.length)
    console.log('First space:', configOverride.spaces?.[0]?.name)
    
    const calculator = new Calculator(variables, customSpaceConstants, customConstants, version, 'default.json', configOverride)
    const result = calculator.result()
    return NextResponse.json({ ...result, version })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    const stack = err instanceof Error ? err.stack : undefined
    console.error('Calculation error:', err)
    console.error('Error stack:', stack)
    return NextResponse.json({ error: 'Calculation failed', message, stack }, { status: 400 })
  }
}

