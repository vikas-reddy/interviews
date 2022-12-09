/* C++ code to find the number of unique good subsequences in a given binary string*/
#include <bits/stdc++.h>
using namespace std;

int numberOfUniqueGoodSubsequences(string binary)
{
    int mod = 1e9 + 7, endsWithZero = 0, endsWithOne = 0, hasZero = 0;
    for (int i = 0; i < binary.length(); ++i)
    {
        if (binary[i] == '1')
        {
            endsWithOne = (endsWithZero + endsWithOne + 1) % mod;
        }
        else
        {
            endsWithZero = (endsWithZero + endsWithOne) % mod;
            hasZero = 1;
        }
    }
    return (endsWithZero + endsWithOne + hasZero) % mod;
}

int main()
{
    string binary;
    binary = "1100100010101010100100000111110001111001000010000010010111011";
    cout << "The total number of unique good subsequences in the string "
        << binary << " are: "
        << numberOfUniqueGoodSubsequences(binary) << endl;
}
