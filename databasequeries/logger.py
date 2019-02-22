def write_line(line):
    out_file = open("test.txt", "a", encoding="UTF-8")
    out_file.write('%s\n' %line)
    out_file.close()