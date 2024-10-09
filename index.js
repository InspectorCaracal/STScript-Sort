import { SlashCommand } from '../../../slash-commands/SlashCommand.js';
import { ARGUMENT_TYPE, SlashCommandArgument, SlashCommandNamedArgument } from '../../../slash-commands/SlashCommandArgument.js';
import { SlashCommandParser } from '../../../slash-commands/SlashCommandParser.js';
import { isFalseBoolean } from '../../../utils.js';

function customSortComparitor(a, b) {
    if (typeof a != typeof b) {
        a = typeof a;
        b = typeof b;
    }
    return a > b ? 1 : a < b ? -1 : 0;
}

SlashCommandParser.addCommandObject(SlashCommand.fromProps({ name: 'sort',
    callback: (args, value) => {
        let list;
        if (typeof value == 'string') {
            try {
                list = JSON.parse(value);
            } catch { 
              // TODO: figure out how to send errors?
              // return the original input if it was invalid
              return value;
            }
        } else {
          list = value
        }
        if (Array.isArray(list)) {
            // always sort lists by value
            list.sort(customSortComparitor)
        } else if (typeof list == 'object') {
            let keysort = args.keysort;
            if (isFalseBoolean(keysort)) {
              list = Object.keys(list).sort(function(a,b){return customSortComparitor(list[a],list[b])});
            } else {
              list = Object.keys(list).sort(customSortComparitor);
            }
        }
        return JSON.stringify(list);
    },
    namedArgumentList: [
      SlashCommandNamedArgument.fromProps({ name: 'keysort',
          description: 'whether to sort by key or value; ignored for lists',
          typeList: [ARGUMENT_TYPE.BOOLEAN],
          enumList: ['true', 'false'],
          defaultValue: 'true',
    }),
  ],
  unnamedArgumentList: [
        SlashCommandArgument.fromProps({
            description: 'the list or dictionary to sort',
            typeList: [ARGUMENT_TYPE.LIST, ARGUMENT_TYPE.DICTIONARY],
            isRequired: true,
        }),
    ],
    helpString: 'Returns a list or list of keys, sorted in ascending order. If keysort=false and given a dictionary, the returned list of keys is sorted by associated value.',
    returns: 'the sorted list/dictionary',
}));
