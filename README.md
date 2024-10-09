# STScript Sort

A small extension which adds a `/sort` command to STScript.

When sorting a list, it returns the sorted list.

When sorting a dictionary, this command returns a list of keys, representing the sorted order of the dictionary. By default, this will sort the dictionary by keys; to sort by value, include `keysort=false`.

### Examples

    /sort [5,3,4,1,2]
    returns [1, 2, 3, 4, 5]

    /sort {"a": 1, "d": 3, "c": 2, "b": 5}
    returns ["a", "b", "c", "d"]

    /sort keysort=false {"a": 1, "d": 3, "c": 2, "b": 5}
    returns ["a", "c", "d", "b"]
