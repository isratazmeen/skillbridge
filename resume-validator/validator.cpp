#include <iostream>
#include <fstream>
#include <regex>
#include <string>
using namespace std;

int main() {
    ifstream file("resume.txt");
    string line;
    regex email(R"([\w.-]+@[\w.-]+\.\w{2,})");
    regex phone(R"(\b\d{10}\b)");

    bool emailFound = false, phoneFound = false;

    while (getline(file, line)) {
        if (regex_search(line, email)) emailFound = true;
        if (regex_search(line, phone)) phoneFound = true;
    }

    cout << "Email: " << (emailFound ? "✔ Found" : "✘ Missing") << endl;
    cout << "Phone: " << (phoneFound ? "✔ Found" : "✘ Missing") << endl;

    return 0;
}