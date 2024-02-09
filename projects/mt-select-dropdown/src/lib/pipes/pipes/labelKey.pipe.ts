import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'labelKey' })
export class LabelKeyPipe implements PipeTransform {
    transform(option: any, labelKey: string): any {
        if (!option || !labelKey) return '';

        const keys = labelKey.split('.');
        let value = option;

        for (const key of keys) {
            if (!value) break;

            if (key.includes('[')) {
                const arrayKey = key.split('[');
                const arrayIndex = Number(arrayKey[1].replace(']', ''));
                value = value[arrayKey[0]] ? value[arrayKey[0]][arrayIndex] : '';
            } else {
                value = value[key];
            }
        }

        return value;
    }
}
