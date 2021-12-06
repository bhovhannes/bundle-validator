import { parse } from 'bcp-47'
import fsPromises from 'node:fs/promises'
import { LoggedError } from '../../lib/LoggedError.js'
import { magenta } from '../../lib/colors.js'

export function normalizeLocales(locales) {
  if (locales) {
    locales = locales.split(',')
  } else {
    locales = []
  }
  for (let locale of locales) {
    parse(locale, {
      warning: (reason, code, offset) => {
        throw new LoggedError(
          `Provided locale "${magenta(
            locale
          )}" is not a valid BCP-47 language tag. ${reason} at offset ${offset}.`
        )
      }
    })
  }
  return locales
}

export function normalizeNamespaces(namespaces) {
  if (namespaces) {
    namespaces = namespaces.split(',')
  } else {
    namespaces = []
  }
  return namespaces
}

export async function getTranslatableNamespaceList(messagesPath) {
  let namespaces = await fsPromises.readdir(messagesPath)
  namespaces = namespaces.filter((ns) => !ns.startsWith('.'))

  // TODO [hb]   Remove this line once '%' placeholders will be changed to ICU placeholders
  namespaces = namespaces.filter((ns) => !ns.startsWith('mlm.'))

  return namespaces
}
