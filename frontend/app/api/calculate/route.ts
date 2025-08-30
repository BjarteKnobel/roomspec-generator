import { NextResponse } from 'next/server'
import Calculator from '../../../../src/calculations/calculator'
import type { IRequest } from '../../../../src/calculations/interfaces/request'
import type { IVariable } from '../../../../src/calculations/interfaces/variable'
import type { IConstant } from '../../../../src/calculations/interfaces/constant'
import type { TCustomSpaceConstants } from '../../../../src/calculations/types/custom_space_constant'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  try {
    const body: IRequest = await req.json()
    const version = '1'
    const variables: IVariable = body.variables
    const customSpaceConstants: TCustomSpaceConstants | undefined = body.customSpaceConstants
    const customConstants: IConstant | undefined = body.customConstants
    const calculator = new Calculator(variables, customSpaceConstants, customConstants, version)
    const result = calculator.result()
    return NextResponse.json({ ...result, version })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: 'Calculation failed', message }, { status: 400 })
  }
}

