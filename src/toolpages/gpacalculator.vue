<script setup>
import { ref } from 'vue'
</script>

<template>
    <div class="p-[30px]"></div>
    <div class="p-5">
        <p class="text-lg font-semibold">GPA Calculator</p>
        <p class="italic bg-yellow-200 w-fit">This program is under development and is NOT completed. Come back soon!</p>
        <div class="p-[1px] my-2 bg-zinc-200"></div>
        <div class="my-5">
            <p class="italic text-zinc-500">Text (.txt) files only</p>
            <input type="file">
            <div class="my-3">
                <p class="font-semibold">GPA: <span class="font-normal">3.33</span></p>
                <p class="font-semibold">Total grade points: <span class="font-normal"> 137.200</span></p>
                <p class="font-semibold">Total credits: <span class="font-normal">34</span></p>
            </div>
        </div>
        <div class="p-[1px] my-2 bg-zinc-200"></div>
        <div class="max-w-[700px] space-y-3">
            <div>
                <p class="font-semibold">How this works</p>
                <p>This page has a program where it will read info from a given text file and return the calculated GPA.
                </p>
                <p>The program is designed this way in order to let you more easily customize and save your class list
                    for
                    easier GPA calculation.</p>
            </div>
            <div>
                <p class="font-semibold">Instructions:</p>
                <ul class="list-disc ml-5">
                    <li>Create a text (.txt) file</li>
                    <li>Begin typing your classes in that text file following this <span class="underline">exact</span>
                        format:
                    </li>
                    <p>For semester labels:</p>
                    <div class="codeTxt"><code> -(FA/SM/SP),(Last 2 digits of Year)</code></div>
                    <p>For classes:</p>
                    <div class="codeTxt"><code>(CLASS 100),(CREDITS),(GRADE)</code></div>
                    <p>For example,</p>
                    <div class="codeTxt">
                        <pre>
 -FA,24   
 CS 135,3,A
 ENG 102,3,A
            </pre>
                    </div>
                    <li>After finishing the text file, click "Upload File" and upload the text file. The program will
                        read
                        the file and automatically tell you the calculated GPA.
                    </li>
                </ul>
            </div>
            <div>
                <p class="font-semibold">Notes</p>
                <ul class="list-disc ml-5">
                    <li>Progress will be lost if you refresh (but this shouldn't be a concern since your text file is saved/created on your PC).</li>
                    <li>The output will display exactly what's shown on MyUNLV
                    </li>
                    <li>This program does consider classes with an S/U grade (they don't contribute to the GPA).
                    </li>
                    <li>You can make a text (.txt) file by making a new note on your PC, typing in it, and clicking ctrl+s (which saves the text file onto your PC)
                    </li>
                    <li>Let me know if this doesn't work or if there are issues!
                    </li>
                </ul>
            </div>
        </div>
    </div>

</template>

<style scoped>
.codeTxt {
    padding-top: 5px;
    padding-bottom: 5px
}
</style>