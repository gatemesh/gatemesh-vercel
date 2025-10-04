#!/usr/bin/env python3
"""
Generate ringtone.proto file for LittleFS filesystem
Reads USERPREFS_RINGTONE_RTTTL from userPrefs.jsonc and creates a protobuf file
"""

import os
import json
import struct
import sys

def read_user_prefs():
    """Read userPrefs.jsonc and extract ringtone"""
    prefs_file = os.path.join(os.path.dirname(__file__), '..', 'userPrefs.jsonc')

    try:
        with open(prefs_file, 'r') as f:
            # Remove comments from jsonc
            content = f.read()
            lines = []
            for line in content.split('\n'):
                # Remove // comments
                if '//' in line:
                    line = line[:line.index('//')]
                lines.append(line)
            clean_json = '\n'.join(lines)

            prefs = json.loads(clean_json)
            ringtone = prefs.get('USERPREFS_RINGTONE_RTTTL', '')

            if not ringtone:
                print("Warning: No USERPREFS_RINGTONE_RTTTL found in userPrefs.jsonc")
                return None

            return ringtone
    except Exception as e:
        print(f"Error reading userPrefs.jsonc: {e}")
        return None

def encode_protobuf_string(field_number, value):
    """
    Encode a string field in protobuf format
    Field number 1 (ringtone) with wire type 2 (length-delimited)
    """
    # Wire type 2 = length-delimited (for strings)
    tag = (field_number << 3) | 2

    # Encode the string
    string_bytes = value.encode('utf-8')
    length = len(string_bytes)

    # Varint encode the tag
    result = bytearray()
    result.append(tag)

    # Varint encode the length
    result.append(length)

    # Add the string bytes
    result.extend(string_bytes)

    return bytes(result)

def generate_ringtone_proto(ringtone, output_path):
    """Generate the ringtone.proto protobuf file"""
    # Field 1 is ringtone (string)
    proto_data = encode_protobuf_string(1, ringtone)

    # Ensure directory exists
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    # Write the protobuf file
    with open(output_path, 'wb') as f:
        f.write(proto_data)

    print(f"Generated {output_path} ({len(proto_data)} bytes)")
    print(f"Ringtone: {ringtone[:50]}..." if len(ringtone) > 50 else f"Ringtone: {ringtone}")

def main():
    # Read ringtone from userPrefs.jsonc
    ringtone = read_user_prefs()

    if ringtone:
        # Generate the proto file in data/prefs/
        data_dir = os.path.join(os.path.dirname(__file__), '..', 'data', 'prefs')
        output_path = os.path.join(data_dir, 'ringtone.proto')

        generate_ringtone_proto(ringtone, output_path)
        return 0
    else:
        print("Failed to generate ringtone.proto")
        return 1

if __name__ == '__main__':
    sys.exit(main())
