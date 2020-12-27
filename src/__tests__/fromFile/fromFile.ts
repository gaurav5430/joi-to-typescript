import { readFileSync } from 'fs';

import { convertFromDirectory } from '../../index';

describe('test reading schemas from files', () => {
  const typeOutputDirectory = './src/__tests__/fromFile/models';
  test('does reading form files work', async () => {
    const result = await convertFromDirectory({
      schemaDirectory: './src/__tests__/fromFile/schemas',
      typeOutputDirectory
    });

    expect(result).toBe(true);
  });
  test('index.ts file contain correct content', () => {
    const indexContent = readFileSync(`${typeOutputDirectory}/index.ts`).toString();

    expect(indexContent).toBe(
      `/**
 * This file was automatically generated by joi-to-typescript
 * Do not modify this file manually
 */

export * from './FooBar';
export * from './One';
`
    );
  });
  test('One.ts file exists and its content', () => {
    const oneContent = readFileSync(`${typeOutputDirectory}/One.ts`).toString();

    expect(oneContent).toBe(
      `/**
 * This file was automatically generated by joi-to-typescript
 * Do not modify this file manually
 */

/**
 * a test schema definition
 */
export interface TestSchema {
  'yellow.flower'?: string;
  name?: string;
  propertyName1: boolean;
}
`
    );
  });

  test('FooBar.ts file contain correct content', () => {
    const fooBarContent = readFileSync(`${typeOutputDirectory}/FooBar.ts`).toString();

    expect(fooBarContent).toBe(`/**
 * This file was automatically generated by joi-to-typescript
 * Do not modify this file manually
 */

export interface Bar {
  /**
   * Id
   */
  id: number;
}

export interface Foo {
  /**
   * Bar
   */
  bar: Bar;
  /**
   * Id
   */
  id: number;
}
`);
  });

  test('input directory that does not exits', async () => {
    await expect(
      convertFromDirectory({
        schemaDirectory: './src/__tests__/doesnotexist',
        typeOutputDirectory
      })
    ).rejects.toThrowError();
  });

  test('output directory that does not exits', async () => {
    await expect(
      convertFromDirectory({
        schemaDirectory: './src/__tests__/fromFile/schemas',
        typeOutputDirectory: './src/__tests__/fromFile/fake/fake'
      })
    ).rejects.toThrowError();
  });
});