import type { IParser } from '../interfaces';
import type { Context } from '../Interpreter';
import { escapeContent } from '../Utils/Util';
import { BaseParser } from './Base';

/**
 * This tag formats a given string.
 *
 * @example
 * ```yaml
 *     {lower:Hello Parbez!}
 *     # hello parbez!
 *     {upper:Hello Parbez!}
 *     # HELLO PARBEZ!
 *     {capitalize:hello parbez!}
 *     # Hello parbez!
 *     {escape:Hello| Parbez!}
 *     # Hello\\| Parbez!
 * ```
 */
export class StringFormatParser extends BaseParser implements IParser {
	public constructor() {
		super(['lower', 'upper', 'capitalize', 'escape'], false, true);
	}

	public parse(ctx: Context) {
		const { declaration, payload } = ctx.tag;
		switch (declaration as 'lower' | 'upper' | 'capitalize' | 'escape') {
			case 'lower':
				return payload!.toLowerCase();
			case 'upper':
				return payload!.toUpperCase();
			case 'capitalize':
				return payload!.charAt(0).toUpperCase() + payload!.slice(1);
			case 'escape':
				return escapeContent(payload!);
		}
	}
}

export class OrdinalFormatParser extends BaseParser implements IParser {
	public constructor() {
		super(['ordinal', 'ord'], false, true);
	}

	public parse(ctx: Context) {
		const { payload } = ctx.tag;
		if (isNaN(Number(payload))) return payload;
		const lastDigit = payload!.slice(-1);
		const suffix = lastDigit === '1' ? 'st' : lastDigit === '2' ? 'nd' : lastDigit === '3' ? 'rd' : 'th';
		return `${payload}${suffix}`;
	}
}
