import tkinter as tk

def move_circle_horizontal(value):
    x = int(value) * 1  # Adjust the multiplier as needed for your desired range
    global disp_x
    global disp_y
    disp_x = x
    canvas.delete("circle")
    canvas.create_oval(x, disp_y, x + circle_radius, disp_y + circle_radius, fill="blue", tags="circle")

def move_circle_vertical(value):
    y = int(value) * 1  # Adjust the multiplier as needed for your desired range
    global disp_x
    global disp_y
    disp_y = y
    canvas.delete("circle")
    canvas.create_oval(disp_x, y, disp_x+circle_radius, y + circle_radius, fill="blue", tags="circle")

def resize_camera_fov():
    global width_win, height_win, spinbox1
    fov_width = spinbox1.get()*2
    canvas.delete("line")
    canvas.create_line(int(width_win/2), 0, int(width_win/2), height_win, width=fov_width, fill="red", tags="line")

width_win = 400
height_win = 200  
x_constraint = 4
y_constraint = 6

disp_x = 200
disp_y = 100
circle_radius = 50

objectives = [2.3, 5, 20]

root = tk.Tk()
root.title("Circle Slider")
obj_fov = tk.IntVar()
spinbox1 = tk.IntVar()
canvas = tk.Canvas(root, width=width_win, height=height_win)
spinbox1 = tk.Spinbox(root, values=objectives, textvariable=obj_fov, command=resize_camera_fov)
spinbox1.pack(anchor="n")

canvas.create_line(int(width_win/2), 0, int(width_win/2), height_win, width=10, fill="red", tags="line")
canvas.create_oval(disp_x, disp_y, disp_x+circle_radius, disp_y+circle_radius, fill="blue", tags="circle")
canvas.pack()

slider1 = tk.Scale(root, activebackground="yellow", from_=int(height_win/y_constraint), to=height_win-int(height_win/y_constraint)-circle_radius, orient="vertical", command=move_circle_vertical)
slider2 = tk.Scale(root, activebackground="yellow", from_=int(width_win/x_constraint), to=width_win-int(width_win/x_constraint)-circle_radius, orient="horizontal", command=move_circle_horizontal)

slider1.pack(anchor="w")
slider2.pack(anchor="s")



root.mainloop()